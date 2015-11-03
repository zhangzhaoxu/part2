var app = angular.module("app",['multipleDatePicker','ngMaterial']);

app.controller("dateCtrl",function($scope,$mdDialog){
    $scope.showDatePicker = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'tpl/DatePicker.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        })
            .then(function(answer) {
            }, function() {
            });
    };
})


function DialogController($scope,$mdDialog,$http){
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.select=1;
    $scope.DayCourse = [];

    $scope.Daychange = function(event, date) {
        event.preventDefault();
        $scope.select=1;
        var TemporaryDate = date._d.getFullYear()+"/"+(date._d.getMonth()+1)+"/"+date._d.getDate();
        if(date.selected){
            angular.forEach($scope.DayCourse, function (course, index) {
                if(course.date == TemporaryDate){
                    $scope.DayCourse.splice(index,1);
                    return;
                }
            });
            date.selected = !date.selected;
        }else{
            date.selected = !date.selected;
            $scope.DayCourse.push({
                date:TemporaryDate,
                num:$scope.select
            });
        }
    };

    $scope.changeDayCourseNum = function () {
        if($scope.DayCourse.length!=0){
            $scope.DayCourse[$scope.DayCourse.length-1].num = $scope.select;
        }
    };

    //$scope.MonthChanged = function(newMonth, oldMonth){   //当月份发生变化时，更换$scope.DayCourse的值。
    //
    //    $scope.DayCourse = [];
    //
    //    //$http({
    //    //    method:"GET",
    //    //    url:"",
    //    //    data:{
    //    //        newMonth:newMonth.format('YYYY-M-DD'),
    //    //        oldMonth:oldMonth.format('YYYY-M-DD')||null
    //    //    }
    //    //}).success(function(data){
    //    //    $scope.DayCourse = data||[];
    //    //}).error(function(err){
    //    //    alert("err");
    //    //});
    //};
    //$scope.MonthChanged(new Date().getMonth()+1,null); //初次登录时，加载该月份DayCourse
}