# Copyright (c) 2013, Web Notes Technologies Pvt. Ltd.
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import webnotes
from webnotes.utils import flt

def execute(filters=None):
	if not filters: filters = {}
	columns = get_columns(filters)
	data=webnotes.conn.sql("select name,net_total_export as `Net Amount`,other_charges_total_export as `Total Charges And Taxes`,rounded_total_export as `Total Amount` from `tabSales Order` union select '',sum( net_total_export),sum(other_charges_total_export),sum(rounded_total_export) from `tabSales Order`",debug=1)
	return columns, data

def get_columns(filters):
	"""return columns based on filters"""
	columns = ["Sales Order:Link/Sales Order:100", "Net Amount::150", "Other Charges and Total::150", "Total Amount::100"]
	return columns
