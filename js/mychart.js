/*
 * author: fangxb
 * data 2015-01-28
 */

function MyChart(render,data,labels,config){
    this.divId = render;
    this.chartId = this.divId+"_chart";
    this.width = config.width;//275;//document.querySelector("#"+this.divId).style.width;
    this.height = config.height;//210;
    if(data.length<3) return;
    this.data =data;
    this.legend_data = new Array();
    for(var i =0;i<data.length;i++){
    	  this.legend_data.push({name:data[i].name,color:data[i].color});
    	}
    this.paramdata = this.data;
    this.linedata = this.data[2];
    this.paramdata.pop();
    this.resizeNum=0;
    this.options = {
    	id : this.chartId,
        render : this.divId,
        labels : labels,
        data: this.paramdata,
        width : this.width,
        height : this.height,
        align:'left',
        animation :true,
        animation_duration : 900,
        
        gradient : false,
        color_factor : 0.2,
        offsetx:12,
        offsety:-20,
        background_color : 'rgba(0,0,0,0.0)',
        sub_option: {
            label :false
        },
        label:{
            color:"#ffffff",
            fontsize : 5

        },
        column_width : 4,//柱形宽度
        zScale:5,//z轴深度倍数
        xAngle : 20,
        /*bottom_scale:0.1,*///3D效果中z轴底座的深度因子(与宽度比)默认 1.4
        border:{
            color:"#2b5799",
            width:0
        },
        legend:{
            enable:true,
            background_color : 'rgba(0,0,0,0.0)',
            data : this.legend_data,//this.data,
            color:'#ffffff',
            border : {
                enable : false
            },
             //row:1,
            column : 3,
            align:"center",
           //valign:"buttom",
            //column : "max",
            offsetx:0,
            offsety:13,
            valign:'bottom',
            width:'100%'
		},
        text_space : 6,//坐标系下方的label距离坐标系的距离。
        tip:{enable:true},
        coordinate:{
            width:'90%',
            height:'90%',
            background_color : "rgba(0,0,0,0.0)",
            grid_color : '#ffffff',
            color_factor : 0.2,
            offsety:-10,
            board_deep:10,
            pedestal_height:4,//坐标系高度
            left_board:true,
           // wall_style : [],
           // yAngle:0,
           // xAngle:0,
           /* axis:{
                color:"#ec4646",
                width:[0,0,44,0]
            },*/
            wall_style:[{//坐标系的各个面样式
                color : '#9BD1FF'
            },{
                color : 'rgba(0,0,0,0.0)'
            }, {
                color : 'rgba(0,0,0,0.0)'
            },{
                color : '#9BD1FF'
            },{
                color : 'rgba(0,0,0,0.0)'
            },{
                color : 'rgba(0,0,0,0.0)'
            }],
            label:{
                color:"#ffffff"
            },
            scale:[{
                position:'left',
                start_scale:0,
                end_scale:95,
                scale_space:20,
                color:"#ffffff",
                listeners:{
                    parseText:function(t,x,y){
                        return {text:t}
                    }
                }
            }]
        }

    } ;
    var chart = new iChart.ColumnMulti3D(this.options);
    // var chart = new iChart.Column2D(this.options);
    //this.linedata.value.unshift(this.linedata.value[0]);
    //this.linedata.value.push(this.linedata.value[this.linedata.value.length-1]);
    //var lineT = new Array();
    //lineT.push(this.linedata);
		var line = new iChart.LineBasic2D({
				z_index:1000,
				data: [this.linedata],
				label:{
					color:'#4c4f48'
				},
				point_space:chart.get("column_space")+chart.get("column_width")*2,
				scaleAlign : 'right',
				sub_option : {
					label:false,
					point_size:3
				},
				coordinate:chart.coo//共用坐标系
			});

			chart.plugin(line);
    this.draw = function(){
        chart.draw();
    };

   this.load = function(data){
       this.linedata = data[2];
       this.data = data;
    		var chartTemp = $.get(this.chartId);
        chartTemp.plugins[0].load([data[2]]);
        data.pop();
        chartTemp.load(data);

    };
   this.resize = function(width,height){
    	var chartTemp = $.get(this.chartId);
       /*chartTemp.push('plugin',null);*/
        chartTemp.remove(chartTemp,chartTemp.plugins[this.resizeNum]);
       this.resizeNum++;
        chartTemp.resize(width,height);
        var line = new iChart.LineBasic2D({
           z_index:1000,
           data: [this.linedata],
           label:{
               color:'#4c4f48'
           },
           point_space:chartTemp.get("column_space")+chartTemp.get("column_width")*2,
           scaleAlign : 'right',
           sub_option : {
               label:false,
               point_size:3
           },
           coordinate:chartTemp.coo//共用坐标系
       });
       chartTemp.plugin(line);
       chartTemp.draw();

    };

}
 	
 