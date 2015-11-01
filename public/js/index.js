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
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
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


    $scope.logInfos = function(event, date) {
        event.preventDefault();
        console.log(date);
        date.selected = !date.selected
    }
}