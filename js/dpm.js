//柱状图
function Bar(control_id, data, label, color) {
    var randomScalingFactor = function () { return Math.round(Math.random() * 100) };
    Bar.labels = label;
    var DatasetArr = new Array();
    for (var i = 0; i < data.length; i++)
    {
        DatasetArr[i] = {
            fillColor: color[i],
            data: data[i]
        };
    };
    var barChartData = {
        labels:labels,
        datasets: DatasetArr
    }
    var ctx = document.getElementById(control_id).getContext("2d");
    return new Chart(ctx).Bar(barChartData);
}
//柱状图
function Bar(control_id, data, label) {
    var randomScalingFactor = function () { return Math.round(Math.random() * 100) };
    Bar.labels = label;
    var color = new Array(["rgba(220,220,220,0.5)"], ["rgba(151,187,205,0.5)"]);
    var DatasetArr = new Array();
    for (var i = 0; i < data.length; i++) {
        DatasetArr[i] = {
            fillColor: color[i],
            data: data[i]
        };
    };
    var barChartData = {
        labels: labels,
        datasets: DatasetArr
    }
    var ctx = document.getElementById(control_id).getContext("2d");
    return new Chart(ctx).Bar(barChartData);
}
//折线图
function Line(control_id, data, label, color) {
    var randomScalingFactor = function () { return Math.round(Math.random() * 100) };
    Line.labels = label;
    var DatasetArr = new Array();
    for (var i = 0; i < data.length; i++) {
        DatasetArr[i] = {
            fillColor: color[i],
            data: data[i]
        };
    };
    var barChartData = {
        labels: labels,
        datasets: DatasetArr
    }
    var ctx = document.getElementById(control_id).getContext("2d");
    return new Chart(ctx).Line(barChartData);
}
//折线图
function Line(control_id, data, label) {
    var randomScalingFactor = function () { return Math.round(Math.random() * 100) };
    Line.labels = label;
    var color = new Array(["rgba(220,220,220,0.5)"], ["rgba(151,187,205,0.5)"]);
    var DatasetArr = new Array();
    for (var i = 0; i < data.length; i++) {
        DatasetArr[i] = {
            fillColor: color[i],
            data: data[i]
        };
    };
    var barChartData = {
        labels: labels,
        datasets: DatasetArr
    }
    var ctx = document.getElementById(control_id).getContext("2d");
    return new Chart(ctx).Line(barChartData);
}
function Doughnut(control_id, data, label) {
    var randomScalingFactor = function () { return Math.round(Math.random() * 100) };
    Doughnut.labels = label;
    var color = new Array(["rgba(220,220,220,0.5)"], ["rgba(151,187,205,0.5)"]);
    var DatasetArr = new Array();
    for (var i = 0; i < data.length; i++) {
        DatasetArr[i] = {
            fillColor: color[i],
            data: data[i]
        };
    };
    var barChartData = {
        labels: labels,
        datasets: DatasetArr
    }
    var ctx = document.getElementById(control_id).getContext("2d");
    return new Chart(ctx).Doughnut(barChartData);
}