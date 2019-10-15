/*
 * author: cai.liao
 * data 2015-02-01
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
    this.paramdata = [this.data[0]];
    this.linedata = [this.data[1],this.data[2]];
    this.resizeNum=0;
/*    this.paramdata.pop();*/

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
            valign:'bottom'
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
            offsetx:5,
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
				data: this.linedata,
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
    		var chartTemp = $.get(this.chartId);
       this.linedata = [data[1],data[2]];
        chartTemp.plugins[0].load([data[1],data[2]]);
        chartTemp.load([data[0]]);

    };
   this.resize = function(width,height){
       var chartTemp = $.get(this.chartId);
       chartTemp.remove(chartTemp,chartTemp.plugins[this.resizeNum]);
       this.resizeNum++;
       chartTemp.resize(width,height);
       var line = new iChart.LineBasic2D({
           z_index:1000,
           data: this.linedata,
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

function CircleGraph(id,data,config){
    this.divId = id;
    this.chartId = this.divId+'_circle';
    this.width = config.width;
    this.height = config.height;

    this.options = {
        id:this.chartId,
        render : this.divId,
        data: data,
        sub_option : {
            label : {
                background_color:null,
                sign:false,//设置禁用label的小图标
                padding:'0 0',
                border:{
                    enable:false,
                    color:'#666666',
                    width:0
                },
                fontsize:10,
                fontweight:600,
                color : '#ffffff'
            },
            border : {
                width : 0,
                color : '#ffffff'
            }
        },
        border:{
            width:0
        },
        shadow : true,
        shadow_blur : 6,
        shadow_color : '#aaaaaa',
        shadow_offsetx : 0,
        shadow_offsety : 0,
        background_color:'rgba(0,0,0,0.0)',
        offset_angle:-120,//逆时针偏移120度
        showpercent:true,
        decimalsnum:2,
        width : this.width,
        height : this.height,
        radius:120
    };

    var chart = new iChart.Donut2D(this.options);
    chart.draw();
    this.load = function(data){
        var chartTemp = $.get(this.chartId);
        chartTemp.load(data);

    };
    this.resize = function(width,height){
        var chartTemp = $.get(this.chartId);
        chartTemp.resize(width,height);
    };
}

/*$(function(){


    var chart = new iChart.Donut2D({
        render : 'canvasDiv',
        data: data,
        title : {
            text : '2012年第3季度中国第三方手机浏览器市场份额',
            color : '#3e576f'
        },
        footnote : {
            text : 'ichartjs.com',
            color : '#486c8f',
            fontsize : 11,
            padding : '0 38'
        },
        center : {
            text:'90%',
            color:'#3e576f',
            shadow:true,
            shadow_blur : 2,
            shadow_color : '#557797',
            shadow_offsetx : 0,
            shadow_offsety : 0,
            fontsize : 40
        },
        sub_option : {
            label : {
                background_color:null,
                sign:false,//设置禁用label的小图标
                padding:'0 4',
                border:{
                    enable:false,
                    color:'#666666'
                },
                fontsize:11,
                fontweight:600,
                color : '#4572a7'
            },
            border : {
                width : 2,
                color : '#ffffff'
            }
        },
        shadow : true,
        shadow_blur : 6,
        shadow_color : '#aaaaaa',
        shadow_offsetx : 0,
        shadow_offsety : 0,
        background_color:'#fefefe',
        offset_angle:-120,//逆时针偏移120度
        showpercent:true,
        decimalsnum:2,
        width : 800,
        height : 400,
        radius:120
    });

    chart.draw();
});*/
 	
 