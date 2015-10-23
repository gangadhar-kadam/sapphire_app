wn.require('lib/js/lib/jquery/chart.js');
wn.pages['dashboards'].onload = function(wrapper) { 
	wn.ui.make_app_page({
		parent: wrapper,
		title: 'Dashboard',
		single_column: true
	});					


//wn.require('lib/js/lib/jquery/chart.js');
//wn.pages['dashboards'].onload = function(wrapper) { 
//	wn.ui.make_app_page({
//		parent: wrapper,
//		title: 'Dashboards',
//		single_column: true
//	});						

$('<div id="head" style="height:20px; width:100%;" ><b>Financial Health</div>').appendTo($(wrapper).find('.layout-main'));


$("<table class='table' style='height:50px; width:100%;'>\
	<tr width='100%'>\
	<td width='20%'><div class='netprofitcl'  id ='netprofitid'  style='min-height: 50px;'></div></td>\
	<td width='20%'><div class='turnovercl'  id ='turnoverid'  style='min-height: 50px;'></div></td>\
	<td width='20%'><div class='reviveblecl'  id ='revivebleid'  style='min-height: 50px;'></div></td>\
	<td width='18%'><div class='payablecl'  id ='payableid'  style='min-height: 50px;'></div></td>\
	<td width='20%'><div class='cashcl'  id ='cashid'  style='min-height: 50px;'></div></td>\
	</tr>\
	<tr width='100%'>\
	<td width='22%'><div id ='ctab122' style='min-height: 10px;padding-top: 20px;'></div></td>\
	<td width='15%'><div id ='ctab222' style='min-height: 10px;'></div></td>\
	<td width='15%'><div id ='ctab322' style='min-height: 10px;'></div></td>\
	<td width='22%'><div id ='grossid' style='min-height: 50px;' class='grosscl' ></div></td>\
	<td width='22%'><div id ='grosspid' style='min-height: 50px;'class='grosspcl' ></div></td>\
	</table>").appendTo($(wrapper).find('.layout-main'));


$('<div id="head" style="height:20px; width:100%;" ><b>Stock Management</tr></table></div>').appendTo($(wrapper).find('.layout-main'));


$("<table class='table' style='height:50px; width:100%;'>\
	<tr width='100%'>\
	<td width='25%'><div class='pocl'  id ='poid'  style='min-height: 50px;'></div></td>\
	<td width='25%'><div class='cdcl'  id ='csid'  style='min-height: 50px;'></div></td>\
	<td width='25%'><div class='asacl'  id ='asaid'  style='min-height: 50px;'></div></td>\
	<td width='25%'><div class='vsa30dcl'  id ='vsa30did'  style='min-height: 50px;'></div></td>\
	</tr>\
	</table>").appendTo($(wrapper).find('.layout-main'));


$('<div id="head" style="height:20px; width:100%;" ><b>Sales Inspection</tr></table></div>').appendTo($(wrapper).find('.layout-main'));


$('<div id="salesmain" style="height:50px; width:100%;" >\
	<table class="table" style="height:50px; width:100%;" >\
	<tr width="100%">\
	<td width="25%"><div id ="salesmain1" style="min-height: 10px;padding-top: 20px;" ></div></td>\
	<td width="25%"><div id ="salesmain2" style="min-height: 10px;" ></div></td>\
	<td width="25%"><div id ="salesmain3" style="min-height: 10px;" ></div></td>\
	<td width="25%"><div id ="totalsalesid" style="min-height: 10px;" class="totalsalescl" ></div></td>\
	</tr></table></div>').appendTo($(wrapper).find('.layout-main'));

$("<br><br><table class='table table-bordered' style='height:50px; width:100%;border-radius:10px;background-color: #f9f9f9;'>\
	<tr width='100%'>\
	<td width='300px'><div class='grossrowcl'  id ='grossrow'  style='min-height: 50px;'></div></td>\
	<td width='300px'><div class='targetrowcl'  id ='targetrow'  style='min-height: 50px;'></div></td>\
	</tr>\
	</table>").appendTo($(wrapper).find('.layout-main'));

	new wn.Dashboard(wrapper);	

	setTimeout(function(){
        window.location.reload(1);
        console.log("reloading");
        }, 600000);
}	

wn.Dashboard = Class.extend({
	init: function(wrapper) {
		this.wrapper = wrapper;
		this.body = $(this.wrapper).find(".netprofit");
		this.loadnet();
		this.loadfirst();
		this.loadstock();
		this.loadgross();
		this.make_menu_fin();
		
		this.make_menu_sle();
		this.loadsltotal();
		this.make_gross_chart();
		this.make_target_chart();
		},
	loadnet: function(){
		if(inList(user_roles,'Accounts Manager')|| inList(user_roles,'Accounts User') || inList(user_roles,'Administrator') || inList(user_roles,'System Manager') ) {
		me=this;
		var net=0;
		wn.call({
			method:"selling.page.dashboards.dashboards.loadfin",
			callback: function(r) {
			if (r.message.sales_order_total){
			
			$('<table class="table table-bordered" style="height:40px; width:100%;border-radius:10px;background-color: #f9f9f9;"><tr width="100%"><td width="100%" align="center">Net Profit</td></tr><tr width="100%"><td width="100%" align="center"><b><a href="app.html#query-report/Gross Profit">'+format_currency(r.message.sales_order_total,'NGN')+'</b><a></td></tr></table>').appendTo($(me.wrapper).find('.netprofitcl'));		
	    	
			}
			}
    	}); }   	
    },
    loadfirst: function(){
    	if(inList(user_roles,'Accounts Manager')|| inList(user_roles,'Accounts User') || inList(user_roles,'Administrator') || inList(user_roles,'System Manager') ) {
		me=this;
		var net=0;
		wn.call({
			method:"selling.page.dashboards.dashboards.loadfirst",
			callback: function(r) {
			
			if (r.message.sales_order_total){
				$('<table class="table table-bordered" style="height:40px; width:100%;border-radius:10px;background-color: #f9f9f9;"><tr width="100%"><td width="100%" align="center">Turn Over</td></tr><tr width="100%"><td width="100%" align="center"><b><a href="app.html#query-report/Net Profit">'+format_currency(r.message.sales_order_total[0][0],'NGN')+'</a></b></td></tr></table>').appendTo($(me.wrapper).find('.turnovercl'));
	    		
	    		
	    		$('<table class="table table-bordered" style="height:40px; width:100%;border-radius:10px;background-color: #f9f9f9;"><tr width="100%"><td width="100%" align="center">Cash In Bank</td></tr><tr width="100%"><td width="100%" align="center"><b><a href="app.html#Accounts Browser/Account">'+format_currency(r.message.sales_order_total[3][0],'NGN')+'<a></b></td></tr></table>').appendTo($(me.wrapper).find('.cashcl'));	    		
			}
			if (r.message.accounts_rec_total){
			 $('<table class="table table-bordered" style="height:40px; width:100%;border-radius:10px;background-color: #f9f9f9;"><tr width="100%"><td width="100%" align="center" >Receivable</td></tr><tr width="100%"><td width="100%" align="center"><b><a href="app.html#query-report/Accounts Receivable">'+format_currency(r.message.accounts_rec_total,'NGN')+'</a></b></td></tr></table>').appendTo($(me.wrapper).find('.reviveblecl'));	
			}
			if (r.message.accounts_pay_total){
			 $('<table class="table table-bordered" style="height:40px; width:100%;border-radius:10px;background-color: #f9f9f9;"><tr width="100%"><td width="100%" align="center">Payable</td></tr><tr width="100%"><td width="100%" align="center"><b><a href="app.html#query-report/Accounts Payable">'+format_currency(r.message.accounts_pay_total,'NGN')+'<a></b></td></tr></table>').appendTo($(me.wrapper).find('.payablecl'));
			}
			}
    	});    }	
    },
	loadstock: function(){
		if(inList(user_roles,'Material Manager')|| inList(user_roles,'Material Master Manager') || inList(user_roles,'Material User') || inList(user_roles,'Administrator') || inList(user_roles,'System Manager') ) {
		me=this;
		var net=0;
		wn.call({
			method:"selling.page.dashboards.dashboards.loadstock",
			callback: function(r) {
			if (r.message.sales_order_total){
	    	$('<table class="table table-bordered" style="height:40px; width:100%;border-radius:10px;background-color: #f9f9f9;"><tr width="100%"><td width="100%" align="center">Current Stock Value</td></tr><tr width="100%"><td width="100%" align="center"><b><a href="app.html#stock-balance">'+format_currency(r.message.sales_order_total[0][0],'NGN')+'<a></b></td></tr></table>').appendTo($(me.wrapper).find('.cdcl'));
	    	$('<table class="table table-bordered" style="height:40px; width:100%;border-radius:10px;background-color: #f9f9f9;"><tr width="100%"><td width="100%" align="center">Average Stock Age</td></tr><tr width="100%"><td width="100%" align="center"><b><a href="app.html#stock-balance">'+r.message.sales_order_total[0][2]+'<a></b></td></tr></table>').appendTo($(me.wrapper).find('.asacl'));
	    	$('<table class="table table-bordered" style="height:40px; width:100%;border-radius:10px;background-color: #f9f9f9;"><tr width="100%"><td width="100%" align="center">Value Of Stock Above 30 Days</td></tr><tr width="100%"><td width="100%" align="center"><b><a href="app.html#stock-balance">'+format_currency(r.message.sales_order_total[0][1],'NGN')+'<a></b></td></tr></table>').appendTo($(me.wrapper).find('.vsa30dcl'));
			}
			}
    	}); 
		wn.call({
			method:"selling.page.dashboards.dashboards.loadstock1",
			callback: function(r) {
			if (r.message.sales_order_total){
	    		$('<table class="table table-bordered" style="height:40px; width:100%;border-radius:10px;background-color: #f9f9f9;"><tr width="100%"><td width="100%" align="center" >Value of POs Yet To Be Received</td></tr><tr width="100%"><td width="100%" align="center" ><b><a href="app.html#query-report/Purchase Order Items To Be Received"><b>'+format_currency(r.message.sales_order_total[0][0],'NGN')+'<a></b></td></tr></table>').appendTo($(me.wrapper).find('.pocl'));
			}
			}
    	});
}   	
    },
    loadgross:function(fin_ch,fin_fd,fin_td){
    	if(inList(user_roles,'Accounts Manager')|| inList(user_roles,'Accounts User') || inList(user_roles,'Administrator') || inList(user_roles,'System Manager') ) {
    	me=this;
    	wn.call({
			method:"selling.page.dashboards.dashboards.loadfingross",
			args: {
	                from_date:fin_fd,
	                to_date:fin_td,
	                sales_chnl:fin_ch				
			},
			callback: function(r) {
				if (r.message.gross){
					
				    $(me.wrapper).find('.grosscl').empty();	
				    $(me.wrapper).find('.grosspcl').empty();	
    				
    				$('<table class="table table-bordered" style="height:40px; width:100%;border-radius:10px;background-color: #f9f9f9;"><tr width="100%"><td width="100%" align="center">Gross Profit</td></tr><tr width="100%"><td width="100%" align="center"><b><a href="app.html#query-report/Gross Profit">'+format_currency(r.message.gross[0],'NGN')+'<a></td></tr></table>').appendTo($(me.wrapper).find('.grosscl'));
	    			$('<table class="table table-bordered" style="height:40px; width:100%;border-radius:10px;background-color: #f9f9f9;"><tr width="100%"><td width="100%" align="center">Gross Profit %</td></tr><tr width="100%"><td width="100%" align="center"><b><a href="app.html#query-report/Gross Profit">'+r.message.gross[1]+'<a></td></tr></table>').appendTo($(me.wrapper).find('.grosspcl'));    	
	    		}
			}
    	});	}
    },
   	make_menu_fin: function(){
   		if(inList(user_roles,'Accounts Manager')|| inList(user_roles,'Accounts User') || inList(user_roles,'Administrator') || inList(user_roles,'System Manager') ) {
		var me = this;
    	this.fin_field=wn.ui.form.make_control({
		df: {
		    "fieldtype": "Link",
			"options": "Sales Channel",
			"label": "Sales Channel",
			"fieldname": "fin_channel",
			"placeholder": "Sales Channel"
			},
		"only_input":true,
		parent:$(me.wrapper).find("#ctab122"),
		});

		this.fin_field.make_input();

		$(this.wrapper).find("#ctab122").css("width","100%");
		
		this.fin_field1=wn.ui.form.make_control({
		df: {
		    "fieldtype": "Date",
			"label": "From Date",
			"fieldname": "fin_from_date",
			"placeholder": "From Date"
			},
		parent:$(me.wrapper).find("#ctab222"),
		});
		this.fin_field1.make_input();
		 $(this.wrapper).find("#ctab222").css("width","100%");

		this.fin_field2=wn.ui.form.make_control({
		df: {
		    "fieldtype": "Date",
			"label": "To Date",
			"fieldname": "fin_to_date",
			"placeholder": "To Date"
			},
		parent:$(me.wrapper).find("#ctab322"),
		});
		this.fin_field2.make_input();
		$(this.wrapper).find("#ctab322").css("width","100%");  
        
        $(this.wrapper).find("#ctab122").focusout(function() {
			var fin_ch=me.fin_field.$input.val();
			var fin_fd=me.fin_field1.$input.val();
			var fin_td=me.fin_field2.$input.val();
			me.loadgross(fin_ch,fin_fd,fin_td)		
		});
        this.fin_field2.$input.on("change", function() {
			var fin_ch=me.fin_field.$input.val();
			var fin_fd=me.fin_field1.$input.val();
			var fin_td=$(this).val();
			me.loadgross(fin_ch,fin_fd,fin_td)
		});}
	},	
	make_menu_sle: function(){
		if(inList(user_roles,'Sales Master Manager') || inList(user_roles,'Administrator') || inList(user_roles,'System Manager') ) {
		var me = this;
    	this.sle_field=wn.ui.form.make_control({
		df: {
		    "fieldtype": "Link",
			"options": "Sales Channel",
			"label": "Sales Channel",
			"fieldname": "sales_channel",
			"placeholder": "Sales Channel"
			},
		"only_input":true,
		parent:$(me.wrapper).find("#salesmain1"),
		});
		this.sle_field.make_input();
		$(this.wrapper).find("#salesmain1").css("width","100%");		
		
		this.sle_field1=wn.ui.form.make_control({
		df: {
		    "fieldtype": "Date",
			"label": "From Date",
			"fieldname": "from_date",
			"placeholder": "From Date"
			},
		parent:$(me.wrapper).find("#salesmain2"),
		});		
		this.sle_field1.make_input();
		$(this.wrapper).find("#salesmain2").css("width","100%");
		
		this.sle_field2=wn.ui.form.make_control({
		df: {
		    "fieldtype": "Date",
			"label": "To Date",
			"fieldname": "to_date",
			"placeholder": "To Date"
			},
		parent:$(me.wrapper).find("#salesmain3"),
		});
		this.sle_field2.make_input();
		$(this.wrapper).find("#salesmain3").css("width","100%"); 

        $(this.wrapper).find("#salesmain1").focusout(function() {
			var sle_ch=me.sle_field.$input.val();
			var sle_fd=me.sle_field1.$input.val();
			var sle_td=me.sle_field2.$input.val();
			me.make_gross_chart(sle_ch,sle_fd,sle_td)
			me.make_target_chart(sle_ch,sle_fd,sle_td)
			me.loadsltotal(sle_ch,sle_fd,sle_td)
		});

		this.sle_field1.$input.on("change", function() {
			var sle_ch=me.sle_field.$input.val();
			var sle_fd=$(this).val();
			var sle_td=me.sle_field2.$input.val();
			me.make_gross_chart(sle_ch,sle_fd,sle_td)
			me.make_target_chart(sle_ch,sle_fd,sle_td)
			me.loadsltotal(sle_ch,sle_fd,sle_td)
		});

		this.sle_field2.$input.on("change", function() {
			var sle_ch=me.sle_field.$input.val();
			var sle_fd=me.sle_field1.$input.val();
			var sle_td=$(this).val();
			me.make_gross_chart(sle_ch,sle_fd,sle_td)
			me.make_target_chart(sle_ch,sle_fd,sle_td)
			me.loadsltotal(sle_ch,sle_fd,sle_td)
		}); } 
	},
	loadsltotal: function(sle_ch,sle_fd,sle_td){
		var me = this;
		wn.call({
			method:"selling.page.dashboards.dashboards.loadsltotal",
			args: {
	                from_date:sle_fd,
	                to_date:sle_td,
	                sales_chnl:sle_ch			
				},
			callback: function(r) {
			if (r.message.sales_order_total){
			$(me.wrapper).find('.totalsalescl').empty();		
			$('<table class="table table-bordered" style="height:40px; width:100%;border-radius:10px;background-color: #f9f9f9;"><tr width="100%"><td width="100%" align="center">Total Sales</td></tr><tr width="100%"><td width="100%" align="center"><b><a href="app.html#query-report/Net Profit">'+format_currency(r.message.sales_order_total[0][0],'NGN')+'<b><a></td></tr></table>').appendTo($(me.wrapper).find('.totalsalescl'));
			}
			}
    	});   	
    },
	make_gross_chart:function(sle_ch,sle_fd,sle_td){
			var me = this;			
		    wn.call({
			method:"selling.page.dashboards.dashboards.get_gross",
			args: {
	                from_date:sle_fd,
	                to_date:sle_td,
	                sales_chnl:sle_ch			
				},
			callback: function(r) {
			
			var options = {packages: ['corechart'], callback : drawChart};
		    google.load('visualization', '1', options);
		    function drawChart() {
		  	mydata=[['Channel', 'Sales (₦)', 'Gross Profit (₦)','Gross Profit %']];
		  	 for(var x in r.message.sales_order_total){
  				mydata.push(r.message.sales_order_total[x]);
               }
            var data = google.visualization.arrayToDataTable(mydata);
		    var options = {
		      hAxis: {title: 'Amount (₦)',titleTextStyle: {color: '#009933'}},
		      vAxis: {title: '',minValue:0,titleTextStyle: {color: '#009933'}},
		      width: 550,
        	  height:350,
        	  legend: { position: 'top', maxLines: 3 }
		    };
		    $(me.wrapper).find('.grossrowcl').empty();
		    var chart = new google.visualization.BarChart(document.getElementById("grossrow"));
		    chart.draw(data, options);
		    }
		    }
	    });
	},
	make_target_chart:function(sle_ch,sle_fd,sle_td){	
			var me = this;		
		    wn.call({
			method:"selling.page.dashboards.dashboards.get_target",
			args: {
	                from_date:sle_fd,
	                to_date:sle_td,
	                sales_chnl:sle_ch				
				},
			callback: function(r) {
			var options = {packages: ['corechart'], callback : drawChart};
		    google.load('visualization', '1', options);
		    function drawChart() {
		  	mydata=[['Sales Channel', 'Sales Target Achieved (₦)', 'Sales Target Remaining (₦)']];
		  	for(var x in r.message.sales_order_total){
  				mydata.push(r.message.sales_order_total[x]);
            }            
		    var data = google.visualization.arrayToDataTable(mydata);
		    var options = {
		      hAxis: {title: 'Amount (₦)',titleTextStyle: {color: '#009933'}},
		      vAxis: {title: '',minValue:0,titleTextStyle: {color: '#009933'}},
		      width: 550,
        	  height: 350,
        	  legend: { position: 'top', maxLines: 3 },
        	  isStacked: true
		    };
		    $(me.wrapper).find('.targetrowcl').empty();
		    
		    var chart = new google.visualization.BarChart(document.getElementById("targetrow"));
		    chart.draw(data, options);
		    }
		    }
	    });
	},		
});



