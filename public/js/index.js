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


function DialogController($scope,$mdDialog){
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };

    $scope.select=1;
    $scope.DayCourse = [];

    $scope.logInfos = function(event, date) {
        event.preventDefault();
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
        $scope.select = 1;
    }
}