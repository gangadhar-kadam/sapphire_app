// Copyright (c) 2013, Web Notes Technologies Pvt. Ltd.
// License: GNU General Public License v3. See license.txt

wn.query_reports["Sales Person-wise Transaction Summary"] = {
	"filters": [
		{
			fieldname: "sales_person",
			label: "Sales Person",
			fieldtype: "Link",
			options: "Sales Person"
		},
		{
			fieldname: "doc_type",
			label: "Document Type",
			fieldtype: "Select",
			options: "Sales Order\nDelivery Note\nSales Invoice",
			default: "Sales Order"
		},
		{
			fieldname: "from_date",
			label: "From Date",
			fieldtype: "Date",
			default: wn.defaults.get_user_default("year_start_date"),
		},
		{
			fieldname:"to_date",
			label: "To Date",
			fieldtype: "Date",
			default: get_today()
		},
		{
			fieldname:"company",
			label: "Company",
			fieldtype: "Link",
			options: "Company",
			default: wn.defaults.get_default("company")
		},
		{
			fieldname:"item_group",
			label: "Item Group",
			fieldtype: "Link",
			options: "Item Group",
		},
		{
			fieldname:"brand",
			label: "Brand",
			fieldtype: "Link",
			options: "Brand",
		},
		{
			fieldname:"customer",
			label: "Customer",
			fieldtype: "Link",
			options: "Customer",
		},
		{
			fieldname:"customer_group",
			label: "Customer Group",
			fieldtype: "Link",
			options: "Customer Group",
		},
		{
			fieldname:"project_name",
			label: "Project Name",
			fieldtype: "Link",
			options: "Project",
		},
		{
			fieldname:"territory",
			label: "Territory",
			fieldtype: "Link",
			options: "Territory",
		},
	]
}
