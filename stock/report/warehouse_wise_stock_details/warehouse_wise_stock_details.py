# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import webnotes
sql= webnotes.conn.sql
from webnotes.widgets.reportview import get_match_cond

def execute(filters=None):
        if not filters: filters ={}
        data = []
        columns = get_columns()
        data = get_data()
        row = fmt_data(data)
#       webnotes.errprint(['data is ', data])
        return columns, row

def get_columns():
        return ["Warehouse:Link/Warehouse:140", "Item Code:Link/Item:140", 'Quantity::80']

def get_data():
        role = webnotes.conn.get_value('UserRole',{'parent':webnotes.session.user},'role')
        if webnotes.session.user != 'Administrator':

                roles = sql("select role from `tabUserRole` where parent = %s and role = 'Supplier'",webnotes.session.user,as_list=1,debug=1)

                if roles:
                        cond = " and supplier = '%s'"%webnotes.conn.get_value("Profile", webnotes.session.user, "first_name")
                else:
                        cond = " and "+get_match_cond('Purchase Order')

        else:

                cond = "and 1 = 1"
        return webnotes.conn.sql(""" select warehouse,item_code,count(warehouse) from `tabSerial No` 
                        where serial_no is not null
                        and warehouse is not null 
			and supplier is not null 
			and status='Available' """+cond+""" group by item_code,warehouse""", as_list=1)
def fmt_data(data):
        l4 = []
        prev = -2
        for d in data:
                l2 = ['' for q in range(len(data[0]))]
                l3 = ['' for q in range(len(data[0]))]
                if len(l4) != 0:
                        if l4[prev][0] != d[0]:
                                l2[0] = d[0]
                                l4.append(l2)
                                prev = -2
                        else:
                                prev = prev-1
                else:
                        l2[0] = d[0]
                        l4.append(l2)

                l3[1] = d[1]
                l3[2] = d[2]
                l4.append(l3)
        return l4

