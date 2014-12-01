from __future__ import unicode_literals
import webnotes
from webnotes.utils import nowdate, cstr, flt, now,formatdate
from stock.utils import get_buying_amount
from accounts.report.accounts_receivable.accounts_receivable import AccountsReceivableReport
from accounts.report.gross_profit.gross_profit import get_gross_pay
from accounts.report.accounts_payable.accounts_payable import get_acc_pay


@webnotes.whitelist()
def loadfin():
	filters={
	   "company":'Sapphire Virtual Networks LTD'	   
	}
	dts=gross=net=0.0
	dts=get_gross_pay(filters)
	for i in dts[1]:
		if i[0]=='Total':
			gross+=i[15]
	webnotes.errprint(gross)
	sal=webnotes.conn.sql("SELECT sum(ifnull(debit, 0)) - sum(ifnull(credit, 0)) FROM `tabGL Entry` gle WHERE ifnull(is_cancelled, 'No') = 'No' and gle.account in (select name from tabAccount where parent_account='Salaries and Wages - Sapphire')")
	webnotes.errprint(sal)
	net=gross-sal[0][0]
	qry="select ROUND((sum(rounded_total_export)*0.1)/2,2),ROUND(SUM(rounded_total_export),2) from `tabSales Order` " 	
	return{
		"sales_order_total": round(net,2)
	}

@webnotes.whitelist()
def loadfirst():
	data=AccountsReceivableReport().get_data()
	outst=0.0
	for row in data:
		outst+=row[10]
	data1=get_acc_pay()
	outst1=0.0
	for row1 in data1[1]:
		outst1+=row1[12]		
	qry="select ROUND(SUM( net_total_export),2) from `tabSales Order` union select ROUND(sum(ifnull(credit, 0)) - sum(ifnull(debit, 0)),2) as amt from `tabGL Entry` where  account in (select name from `tabAccount` where ifnull(master_type, '') = 'Customer' and docstatus < 2 and company='Sapphire Virtual Networks LTD' ) and ifnull(is_cancelled, 'No') = 'No' and  posting_date<= CURDATE() union select ROUND(sum(ifnull(credit, 0)) - sum(ifnull(debit, 0)),2) as amt from `tabGL Entry` where  account in (select name from `tabAccount` where ifnull(master_type, '') = 'Supplier' and docstatus < 2 and company='Sapphire Virtual Networks LTD') and ifnull(is_cancelled, 'No') = 'No' and  posting_date<= CURDATE() union SELECT sum(ifnull(debit, 0)) - sum(ifnull(credit, 0)) FROM `tabGL Entry` gle WHERE ifnull(is_cancelled, 'No') = 'No' and gle.account in (select name from tabAccount where parent_account='Banks - Sapphire' or parent_account='GTB Bank Accounts - Sapphire')"
	data_dict = webnotes.conn.sql(qry)
	return{
		"sales_order_total": data_dict,
		"accounts_rec_total": round(outst,2),
		"accounts_pay_total":round(outst1,2)
	}

@webnotes.whitelist()
def loadstock():
	qry="select ROUND(sum(s.stock_value),2) as current_stock_value,ROUND(sum(case when cast(DATEDIFF(now(),s.posting_date) as integer)>30 then s.stock_value else 0 end ),2)as 30days_pending_stock_value,ROUND(avg(cast(DATEDIFF(now(),s.posting_date) as integer)),2)/2 as average_stock_age from `tabStock Ledger Entry` s,(select warehouse,item_code,max(concat(posting_date,' ',posting_time)) as posting_date from `tabStock Ledger Entry` group by warehouse,item_code)foo where s.warehouse=foo.warehouse and s.item_code=foo.item_code and concat(s.posting_date,' ',s.posting_time)=foo.posting_date and foo.warehouse=coalesce(null,foo.warehouse) and s.posting_date<coalesce(null,now()) " 	
	data_dict = webnotes.conn.sql(qry)
	return{
		"sales_order_total": data_dict
	}

@webnotes.whitelist()
def loadstock1():
	qry="select ROUND(SUM((ifnull(`tabPurchase Order Item`.qty,0)-ifnull(`tabPurchase Order Item`.received_qty, 0))* ifnull(`tabPurchase Order Item`.import_rate ,0)),2) FROM `tabPurchase Order`,`tabPurchase Order Item` WHERE `tabPurchase Order Item`.`parent` = `tabPurchase Order`.`name` AND `tabPurchase Order`.docstatus = 1 AND `tabPurchase Order`.status != 'Stopped' AND ifnull(`tabPurchase Order Item`.received_qty, 0) < ifnull(`tabPurchase Order Item`.qty, 0)" 	
	data_dict = webnotes.conn.sql(qry)
	return{
		"sales_order_total": data_dict
	}

@webnotes.whitelist()
def loadsltotal(from_date=None,to_date=None,sales_chnl=None):
	qry=''
	if from_date:
		from_date="'"+from_date[6:] + "-" + from_date[3:5] + "-" + from_date[:2]+"'"
	else:
		from_date="null"
	if to_date:
		to_date="'"+to_date[6:] + "-" + to_date[3:5] + "-" + to_date[:2]+"'"
	else:
		to_date="null"
	if sales_chnl:
		sales_chnl="and sales_channel_name='"+sales_chnl+"'"
	else:
		sales_chnl=" "
	qry="select SUM(rounded_total_export) from `tabSales Order`  where sales_channel_name is not null and creation between coalesce("+from_date+",date(concat(year(now()),'-01-01'))) and coalesce("+to_date+",date(concat(year(now()),'-12-31'))) "+sales_chnl+" " 	
	data_dict = webnotes.conn.sql(qry)
	return{
		"sales_order_total": data_dict
	}


@webnotes.whitelist()
def loadfingross(from_date=None,to_date=None,sales_chnl=None):
	if from_date:
	 	from_date=from_date[6:] + "-" + from_date[3:5] + "-" + from_date[:2]
	if to_date:
	 	to_date=to_date[6:] + "-" + to_date[3:5] + "-" + to_date[:2]
	filters={
	   "company":'Sapphire Virtual Networks LTD',
	   "from_date":from_date,
	   "to_date":to_date,
	   "channel_name":sales_chnl
	}
	dts=0.0
	dts=get_gross_pay(filters)
	lst=[]
	for i in dts[1]:
		if i[0]=='Total':
			lst.append(round(i[15],2))
			lst.append(round(i[16],2))
	
	return{
		"gross": lst
	}


@webnotes.whitelist()
def get_gross(from_date=None,to_date=None,sales_chnl=None):
	qry=''
	if from_date:
		from_date="'"+from_date[6:] + "-" + from_date[3:5] + "-" + from_date[:2]+"'"
	else:
		from_date="null"
	if to_date:
		to_date="'"+to_date[6:] + "-" + to_date[3:5] + "-" + to_date[:2]+"'"
	else:
		to_date="null"
	if sales_chnl:
		sales_chnl="'"+sales_chnl+"'"
	else:
		sales_chnl="null"
	qry="select sales_channel,round(sales_amount) as sales_amount,case when profit<0 then 0 else round(profit) end as profit,case when profit>0 then (100/purchase_cost)*profit else 0 end as profit_percentage from ( select so.sales_channel_name as sales_channel,sum(soi.amount) as sales_amount,sum(pr.purchase_rate*soi.qty) as purchase_cost,(sum(soi.amount)-sum(pr.purchase_rate*soi.qty)) as profit from `tabSales Order` so,`tabSales Order Item` soi,`tabPurchase Order Item` pr,(select item_code,max(name) as name from `tabPurchase Order Item` group by item_code)foo where so.name=soi.parent and soi.item_code=pr.item_code and pr.name=foo.name and so.creation between coalesce("+from_date+",date(concat(year(now()),'-01-01'))) and coalesce("+to_date+",date(concat(year(now()),'-12-31'))) and so.sales_channel_name=coalesce("+sales_chnl+",so.sales_channel_name) group by so.sales_channel_name )foo" 	
	data_dict = webnotes.conn.sql(qry)
	return{
		"sales_order_total": data_dict
	}

@webnotes.whitelist()
def get_target(from_date=None,to_date=None,sales_chnl=None):
	
	qry=''
	if from_date:
		from_date="'"+from_date[6:] + "-" + from_date[3:5] + "-" + from_date[:2]+"'"
	else:
		from_date="null"
	if to_date:
		to_date="'"+to_date[6:] + "-" + to_date[3:5] + "-" + to_date[:2]+"'"
	else:
		to_date="null"
	if sales_chnl:
		sales_chnl="'"+sales_chnl+"'"
	else:
		sales_chnl="null"
	qry="select sales_channel,sales_amount,round(case when (target-sales_amount)<0 then 0 else (target-sales_amount) end )as target_remaining from ( SELECT name  AS sales_channel, (select sum(grand_total) from `tabSales Order` where sales_channel_name=foo.name and date_format(creation,'%Y-%m') between coalesce("+from_date+",date_format('2014-01-01','%Y-%m') )and coalesce("+to_date+",date_format('2014-12-31','%Y-%m')) )as sales_amount, sum(monthly_target) AS target from ( SELECT sc.name,cbd.fiscal_year,cbd.budget_distribution,cbd.amount AS yearly_amount,bdd.month,str_to_date(concat(cbd.fiscal_year,'-',bdd.month,'-01'),'%Y-%M-%d') AS DATE,(cbd.amount*percentage_allocation/100) AS monthly_target FROM `tabSales Channel` sc,`tabChannel Budget Distribution` cbd,`tabBudget Distribution Detail` bdd WHERE sc.name=cbd.parent AND cbd.budget_distribution=bdd.parent AND sc.name=coalesce("+sales_chnl+",sc.name) and date_format(str_to_date(concat(cbd.fiscal_year,'-',bdd.month,'-01'),'%Y-%M-%d') ,'%Y-%m') between coalesce("+from_date+",date_format('2014-01-01','%Y-%m') )and coalesce("+to_date+",date_format('2014-12-31','%Y-%m')))foo group by foo.name)foo1" 	
	data_dict = webnotes.conn.sql(qry)
	return{
		"sales_order_total": data_dict
	}
