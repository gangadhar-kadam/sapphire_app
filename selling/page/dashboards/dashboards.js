wn.require('lib/js/lib/jquery/chart.js');

wn.pages['dashboards'].onload = function(wrapper) { 
	wn.ui.make_app_page({
		parent: wrapper,
		title: 'Dashboard',
		single_column: true
	});

$("<div class='finc' style='height:100%; width:50%; display:inline-block' ><b>Financial Health<b>\
	<table class='table' style='height:50px; width:100%; border-right: 1px solid;' >\
	<tr>\
	<td colspan='2'><div id ='ctab122' style='min-height: 10px;padding-top: 20px;'></div></td>\
	<td colspan='2'><div id ='ctab222' style='min-height: 10px;'></div></td>\
	<td colspan='2'><div id ='ctab322' style='min-height: 10px;'></div></td>\
	</tr>\
	<tr>\
	<td width='16%'></td><td width='16%'></td><td width='16%'></td><td width='16%'></td><td width='16%'></td><td width='16%'></td>\
	</tr>\
	<td colspan='6' style='border-top: 0px;'><div class='netprofitcl'  id ='netprofitid'  style='height: 50px;'></div></td>\
	</tr>\
	<tr >\
	<td colspan='6' style='border-top: 0px;'><div class='turnovercl'  id ='turnoverid'  style='height: 50px;'></div></td>\
	</tr>\
	<tr >\
	<td colspan='6' style='border-top: 0px;'><div class='reviveblecl'  id ='revivebleid'  style='height: 50px;'></div></td>\
	</tr>\
	<tr>\
	<td colspan='6' style='border-top: 0px;'><div class='payablecl'  id ='payableid'  style='height: 50px;'></div></td>\
	</tr>\
	<tr>\
	<td colspan='6' style='border-top: 0px;'><div class='cashcl'  id ='cashid'  style='height: 50px;'></div></td>\
	</tr>\
	<tr >\
	<td colspan='6' style='border-top: 0px;'><div id ='grossid' style='height: 50px;' class='grosscl' ></div></td>\
	</tr>\
	<tr >\
	<td colspan='6' style='border-top: 0px;'><div id ='grosspid' style='height: 50px;'class='grosspcl' ></div></td>\
	</table></div>").appendTo($(wrapper).find('.layout-main'));

$("<div class='stck' style='display:inline-block;width:50%' ><b>Stock Management\
	<table class='table'>\
	<tr width='30%'>\
	<td width='25%' height='60px'><div class='pocl'  id ='poid'  style='height: 60px;'></div></td>\
	</tr>\
	<td width='25%' height='60px' style='border-top: 0px;'><div class='cdcl'  id ='csid'  style='height: 60px;'></div></td>\
	</tr>\
	<tr width='60%'>\
	<td width='25%' height='60px' style='border-top: 0px;'><div class='asacl'  id ='asaid'  style='height: 60px;'></div></td>\
	</tr>\
	<tr width='30%'>\
	<td width='25%' height='60px' style='border-top: 0px;'><div class='vsa30dcl'  id ='vsa30did'  style='height: 60px;'></div></td>\
	</tr>\
	</table></div>").appendTo($(wrapper).find('.layout-main'));
 
$('<div id="head" style="height:100%; width:100%;"><b>Sales Inspection</tr></table></div><div id="salesmain" style="height:50px; width:100%;" >\
	<table class="table" style="height:50px; width:100%;" >\
	<tr width="100%">\
	<td width="25%"><div id ="salesmain1" style="min-height: 10px;padding-top: 20px;" ></div></td>\
	<td width="25%"><div id ="salesmain2" style="min-height: 10px;" ></div></td>\
	<td width="25%"><div id ="salesmain3" style="min-height: 10px;" ></div></td>\
	<td width="25%" style="padding-top: 25px;"><div id ="totalsalesid" style="min-height: 10px;" class="totalsalescl" ></div></td>\
	</tr></table></div>\
	<br><br><table class="table table-bordered" style="height:50px; width:100%;border-radius:10px;background-color: #f9f9f9;">\
	<tr width="100%">\
	<td width="300px"><div class="grossrowcl" id ="grossrow"  style="min-height: 50px;"></div></td>\
	<td width="300px"><div class="targetrowcl"  id ="targetrow"  style="min-height: 50px;"></div></td>\
	</tr>\
	</table>').appendTo($(wrapper).find('.layout-main'));

$("<div id='head' style='width:100%;'><b>Customer Details &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='app.html#query-report/Accounts Receivable'>Open Report</a></tr></table></div><div id='customer' class='customercl' style='width:100%;height:300px; overflow: scroll;' >\
	</div>").appendTo($(wrapper).find('.layout-main'));

	new wn.Dashboard(wrapper);
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
		this.loadcust();
		setInterval(function () {
			me.loadnet()
			me.loadfirst()
			me.loadstock();
			me.loadgross();
			//me.loadsltotal();
			me.loadcust();
			me.make_gross_chart();
			me.make_target_chart();
			var fin_ch=me.fin_field.$input.val();
			//console.log(fin_ch)
			var fin_fd=me.fin_field1.$input.val();
			var fin_td=me.fin_field2.$input.val();
			me.loadgross(fin_ch,fin_fd,fin_td)
			var sle_ch=me.sle_field.$input.val();
			var sle_fd=me.sle_field1.$input.val();
			var sle_td=me.sle_field2.$input.val();
			me.make_gross_chart(sle_ch,sle_fd,sle_td)
			me.make_target_chart(sle_ch,sle_fd,sle_td)
			me.loadsltotal(sle_ch,sle_fd,sle_td)
		    }, 600000);
		},

	loadnet: function(fin_ch,fin_fd,fin_td){
		if(inList(user_roles,'Accounts Manager')|| inList(user_roles,'Accounts User') || inList(user_roles,'Administrator') || inList(user_roles,'System Manager') ) {
		me=this;
		$(me.wrapper).find('.netprofitcl').empty();
		var net=0;
		wn.call({
			method:"selling.page.dashboards.dashboards.loadfin",
		        args: {
                        from_date:fin_fd,
                        to_date:fin_td,
                        sales_chnl:fin_ch
                        },


			callback: function(r) {
			//console.log("helo");
			//console.log(r.message);
			if (r.message.sales_order_total>='0.0'){
				//console.log("loadnet")
			    //console.log(r.message.sales_order_total);
			    $('<table class="table table-bordered" style="height:40px; width:70%;"><tr><td align="left" style="width:40%;">Net Profit</td><td align="right" style="width:60%; background-color: #f9f9f9;"><b><a href="app.html#query-report/Gross Profit">₦ '+r.message.sales_order_total.toLocaleString()+'</b><a></td></tr></table>').appendTo($(me.wrapper).find('.netprofitcl'));
			 }
			}
    	}); }   	
    },

    loadfirst: function(fin_ch,fin_fd,fin_td){
    	if(inList(user_roles,'Accounts Manager')|| inList(user_roles,'Accounts User') || inList(user_roles,'Administrator') || inList(user_roles,'System Manager') ) {
		me=this;
		$(me.wrapper).find('.turnovercl').empty();
    	$(me.wrapper).find('.reviveblecl').empty();
    	$(me.wrapper).find('.payablecl').empty();
    	$(me.wrapper).find('.cashcl').empty();
		var net=0;
		wn.call({
			method:"selling.page.dashboards.dashboards.loadfirst",
                        args: {
                        from_date:fin_fd,
                        to_date:fin_td,
                        sales_chnl:fin_ch
                        },
			callback: function(r) {
			if (r.message.all){
			//console.log(r.message.all[0][1]);
			//console.log(r.message.all[0][1].toLocaleString());
				if (r.message.all){
				   $('<table class="table table-bordered" style="height:40px; width:70%; border-radius:10px;"><tr ><td align="left" style="width:40%;">Turn Over</td><td align="right" style="width:60%; background-color: #f9f9f9;"><b><a href="app.html#query-report/Net Profit">₦ '+r.message.all[0][1].toLocaleString()+'</a></b></td></tr></table>').appendTo($(me.wrapper).find('.turnovercl')); 
				   $('<table class="table table-bordered" style="height:40px; width:70%; border-radius:10px;"><tr ><td align="left" style="width:40%;">Cash In Bank</td><td align="right" style="width:60%; background-color: #f9f9f9;"><b><a href="app.html#Accounts Browser/Account">₦ '+r.message.all[1][1].toLocaleString()+'<a></b></td></tr></table>').appendTo($(me.wrapper).find('.cashcl'));	
				}
			if (r.message.accounts_rec_total){      		
	    		$('<table class="table table-bordered" style="height:40px; width:70%; border-radius:10px;"><tr ><td align="left" style="width:40%;">Receivable</td><td align="right" style="width:60%; background-color: #f9f9f9;"><b><a href="app.html#query-report/Accounts Receivable">₦ '+r.message.accounts_rec_total.toLocaleString()+'</a></b></td></tr></table>').appendTo($(me.wrapper).find('.reviveblecl'));
	    	        }
                       if (r.message.accounts_pay_total){
	    		$('<table class="table table-bordered" style="height:40px; width:70%; border-radius:10px;"><tr ><td align="left" style="width:40%;">Payable</td><td align="right" style="width:60%; background-color: #f9f9f9;"><b><a href="app.html#query-report/Accounts Payable">₦ '+r.message.accounts_pay_total.toLocaleString()+'<a></b></td></tr></table>').appendTo($(me.wrapper).find('.payablecl'));
	    	    } 
	    	}
	      }
    	}); }	
    },

	loadstock: function(){
		if(inList(user_roles,'Material Manager')|| inList(user_roles,'Material Master Manager') || inList(user_roles,'Material User') || inList(user_roles,'Administrator') || inList(user_roles,'System Manager') ) {
		me=this;
		$(me.wrapper).find('.cdcl').empty();
		$(me.wrapper).find('.asacl').empty();
		$(me.wrapper).find('.vsa30dcl').empty();
		$(me.wrapper).find('.pocl').empty();
		var net=0;
		wn.call({
			method:"selling.page.dashboards.dashboards.loadstock",
			callback: function(r) {
			if (r.message.sales_order_total){
	    	$('<table class="table table-bordered" style="height:40px; width:70%; border-radius:10px;"><tr ><td align="left" style="width:45%;">Current Stock</td><td align="right" style="width:55%; background-color: #f9f9f9;"><b><a href="app.html#stock-balance">₦ '+r.message.sales_order_total[0][0].toLocaleString()+'<a></b></td></tr></table>').appendTo($(me.wrapper).find('.cdcl'));
	    	$('<table class="table table-bordered" style="height:40px; width:70%; border-radius:10px;"><tr ><td align="left" style="width:45%;">Average Stock Age (In Days)</td><td align="right" style="width:55%; background-color: #f9f9f9;"><b><a href="app.html#stock-balance">'+r.message.sales_order_total[0][2].toLocaleString()+'<a></b></td></tr></table>').appendTo($(me.wrapper).find('.asacl'));
	    	$('<table class="table table-bordered" style="height:40px; width:70%; border-radius:10px;"><tr ><td align="left" style="width:45%;">Value Of Stock Above 30 Days</td><td align="right" style="width:55%; background-color: #f9f9f9;"><b><a href="app.html#stock-balance">₦ '+r.message.sales_order_total[0][1].toLocaleString()+'<a></b></td></tr></table>').appendTo($(me.wrapper).find('.vsa30dcl'));
			}
			}
    	}); 
		wn.call({
			method:"selling.page.dashboards.dashboards.loadstock1",
			callback: function(r) {
			if (r.message.sales_order_total){
	    		$('<table class="table table-bordered" style="height:40px; width:70%; border-radius:10px;"><tr ><td align="left" style="width:45%;">PO Yet To Receive</td><td align="right" style="width:55%; background-color: #f9f9f9;"><b><a href="app.html#query-report/Purchase Order Items To Be Received"><b>₦ '+r.message.sales_order_total[0][0].toLocaleString()+'<a></b></td></tr></table>').appendTo($(me.wrapper).find('.pocl'));
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
    				$('<table class="table table-bordered" style="height:40px; width:70%; border-radius:10px;"><tr ><td align="left" style="width:40%;">Gross Profit</td><td align="right" style="width:60%; background-color: #f9f9f9;"><b><a href="app.html#query-report/Gross Profit">₦ '+r.message.gross[0].toLocaleString()+'<a></td></tr></table>').appendTo($(me.wrapper).find('.grosscl'));
	    			$('<table class="table table-bordered" style="height:40px; width:70%; border-radius:10px;"><tr ><td align="left" style="width:40%;">Gross Profit %</td><td align="right" style="width:60%; background-color: #f9f9f9;"><b><a href="app.html#query-report/Gross Profit">'+r.message.gross[1].toLocaleString()+'<a></td></tr></table>').appendTo($(me.wrapper).find('.grosspcl'));    	
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
			me.loadnet(fin_ch,fin_fd,fin_td)
			me.loadfirst(fin_ch,fin_fd,fin_td)

		});
        this.fin_field2.$input.on("change", function() {
			var fin_ch=me.fin_field.$input.val();
			var fin_fd=me.fin_field1.$input.val();
			var fin_td=$(this).val();
			me.loadgross(fin_ch,fin_fd,fin_td)
			me.loadnet(fin_ch,fin_fd,fin_td)
			me.loadfirst(fin_ch,fin_fd,fin_td)
		});
    }
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
			//console.log("sales total");
			//console.log(r.message.sales_order_total[0][0]);
			//if (r.message.sales_order_total){
			$(me.wrapper).find('.totalsalescl').empty();		
			$('<table class="table table-bordered" style="height:40px; width:100%;border-radius:10px;"><tr width="100%"><td width="40%" align="left">Total Sales</td><td width="60%" align="right" style="background-color: #f9f9f9;"><b><a href="app.html#query-report/Net Profit">₦ '+r.message.sales_order_total[0][0].toLocaleString()+'<b><a></td></tr></table>').appendTo($(me.wrapper).find('.totalsalescl'));
		//	}
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
		  	mydata=[['Channel', 'Sales', 'Gross Profit','Gross Profit %']];
		  	 for(var x in r.message.sales_order_total){
  				mydata.push(r.message.sales_order_total[x]);
               }
            var data = google.visualization.arrayToDataTable(mydata);
		    var options = {
		      hAxis: {title: 'Amount (₦) (In Million)',titleTextStyle: {color: '#009933'}},
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
		      hAxis: {title: 'Amount (₦) (In Million)',titleTextStyle: {color: '#009933'}},
		      vAxis: {title: '',minValue:0,titleTextStyle: {color: '#009933'}},
		      width: 550,
        	  height: 350,
        	  legend: { position: 'top', maxLines: 3 }
        	  //isStacked: true
		    };
		    $(me.wrapper).find('.targetrowcl').empty();
		    var chart = new google.visualization.BarChart(document.getElementById("targetrow"));
		    chart.draw(data, options);
		    }
		    }
	    });
	},		

	loadcust: function(){
    	if(inList(user_roles,'Accounts Manager')|| inList(user_roles,'Accounts User') || inList(user_roles,'Administrator') || inList(user_roles,'System Manager') ) {
		me=this;
		$(me.wrapper).find('.customercl').empty();
		var net=0;
		wn.call({
			method:"selling.page.dashboards.dashboards.loadcust",
			callback: function(r) {
			if (r.message.cust){
			//	console.log(r.message.cust);
                    		var h = "<table class='cust' border='1' style='width:100%;background-color: #f9f9f9;'><thead style='padding=0px;width=100%'><tr style='padding=0px;'><th>#</th><th>Customer Name</th><th>Due Date</th><th>Invoice Amount</th><th>Outstanding</th></tr></thead><tbody style='padding=0px;'>"
                    	for (i=1;i<r.message.cust.length;i++){
                    	var j=i+1
                        h += '<tr style="padding=0px;">'
                        h += '<td>'+j+'</td>'
                        h += '<td>'+r.message.cust[i][2]+'</td>'
                        h += '<td>'+r.message.cust[i][6]+'</td>'
                        h += '<td>'+r.message.cust[i][8]+'</td>'
                        h += '<td>'+r.message.cust[i][10]+'</td></tr></tbody>'                      
                    }                    
                    $(h).appendTo($(me.wrapper).find('.customercl'))                                      
                  }				
			    }
    	}); }	
    },

});

