// Copyright (c) 2013, Web Notes Technologies Pvt. Ltd.
// License: GNU General Public License v3. See license.txt

wn.require("app/js/sales_trends_filters.js");
fltrs = get_filters();
fltrs[0]['options'] += "\nFlexible";
fltrs[1]['options'] += "\nItem Code\nWarehouse";
fltrs[2]['options'] += "\nItem Code\nCustomer Group\nWarehouse"
fltrs.push({
			"fieldname":"from_date",
			"label": "From Date",
			"fieldtype": "Date",
			},{
			"fieldname":"to_date",
			"label": "To Date",
			"fieldtype": "Date"
		});
wn.query_reports["Delivery Note Trends"] = {
	filters: fltrs
 }
