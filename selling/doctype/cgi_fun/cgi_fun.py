#For license information, please see license.txt

from __future__ import unicode_literals
import webnotes

sql = webnotes.conn.sql
from webnotes.model.doc import Document, addchild
from webnotes.utils import cstr, cint, flt, comma_or
from datetime import date,timedelta
import datetime
from webnotes.model.code import get_obj

class DocType:
        def __init__(self, d, dl):
                self.doc, self.doclist = d, dl


        def create_customer(self,company,store):
          re="select name from tabCustomer where name='"+store+"'"
          res=sql(re)
          if res:
            return "Customer already exist:- "+cstr(res[0][0])
          else:
            qry="insert into tabCustomer (name,customer_name,customer_group,customer_type,territory,company) values ('"+store+"','"+store+"','Default Customer Group','Individual','Default','"+company+"')"
            sql(qry)
            return "created customer :-"+store


        def create_so(self,customer,delivery_date,currency,customer_group,territory,price_list_name,price_list_currency,company,fiscal_year,plc_conversion_rate,po_no,items):
          ss=Document('Sales Order')
          ss.naming_series='SO'
          ss.customer=customer
          from datetime import datetime
          ss.delivery_date=datetime.strptime(delivery_date,"%Y-%m-%d").date()
          ss.currency=currency
          ss.customer_group=customer_group
          ss.price_list_name='Operator MTN'
          ss.price_list_currency=price_list_currency
          ss.company=company
          ss.territory='Lagos'
          ss.fiscal_year='2013'
          ss.plc_conversion_rate=plc_conversion_rate
          ss.po_no=po_no
          ss.save(new=1)
          p=''
          for i in items:
            ssi=Document('Sales Order Item')
            ssi.item_code=i['item_code']
            ssi.item_name=i['item_name']
            ssi.description=i['description']
            ssi.parent=ss.name
            ssi.qty=i['qty']
            ssi.stock_uom=i['stock_uom']
            #ssi.ref_rate=i['ref_rate']
            ssi.adj_rate=i['adj_rate']
            ssi.export_rate=i['export_rate']
            ssi.export_amount=i['export_amount']
            p=i['date']
            ssi.reserved_warehouse='Auxano Warehouse'
            ssi.save(new=1)
          ss.save()
          return ss.name

        def get_item(self):
                items=sql("select name,item_name,description,stock_uom,standard_rate,default_warehouse from tabItem")
                import json
                itemlist=[]
                for (name,item_name,description,stock_uom,standard_rate,default_warehouse) in items:
                        item={}
                        item["name"] = name
                        item["item_name"] = item_name
                        item["description"] = description
                        item["stock_uom"] = stock_uom
                        item["standard_rate"] = standard_rate
                        item["default_warehouse"] = 'Default Warehouse'
                        itemlist.append(item)
                parentobj={}
                parentobj['items']=itemlist
                return json.dumps(parentobj)

        def price_list(self):
                qry="select price_list,item_code,ref_rate,buying_or_selling from `tabItem Price` where price_list='Operator MTN'"
                prices=sql(qry)
                import json
                pricelist=[]
                for (price_list,item_code,ref_rate,buying_or_selling) in prices:
                        price={}
                        price["item_code"] = item_code
                        price["ref_rate"] = ref_rate
                        price["buying_or_selling"] = buying_or_selling
                        pricelist.append(price)
                parntobj={}
                parntobj['prices']=pricelist
                return json.dumps(parntobj)
