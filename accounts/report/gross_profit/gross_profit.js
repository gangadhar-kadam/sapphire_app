// Copyright (c) 2013, Web Notes Technologies Pvt. Ltd.
// License: GNU General Public License v3. See license.txt

wn.query_reports["Gross Profit"] = {
	"filters": [
		{
			"fieldname":"company",
			"label": "Company",
			"fieldtype": "Link",
			"options": "Company",
			"default": wn.defaults.get_user_default("company")
		},
		{
			"fieldname":"from_date",
			"label": "From Date",
			"fieldtype": "Date",
			"default": wn.defaults.get_user_default("year_start_date")
		},
		{
			"fieldname":"to_date",
			"label": "To Date",
			"fieldtype": "Date",
			"default": wn.defaults.get_user_default("year_end_date")
		},
		{
			"fieldname":"customer",
			"label": "Customer",
			"fieldtype": "Link",
			"options": "Customer"
		},
		{
			"fieldname":"customer_group",
			"label": "Customer Group",
			"fieldtype": "Link",
			"options": "Customer Group"
		},
		{
			"fieldname":"item_group",
			"label": "Item Group",
			"fieldtype": "Link",
			"options": "Item Group"
		},
	]
}
