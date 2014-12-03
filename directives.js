testApp.directive('toggle', function($parse){
    /*
        toggle a boolean value of a model
        usage: <toggle ng-model="model.truth" on="Active" off="Inactive" classes="{on:'text-success', off:'muted', classes:['pull-right']}"></toggle>
        classes attribute is optional and can be just an array of classes, depends on fa-icons
    */
    return {
        restrict: 'E',
        require: 'ngModel',
        template: '<span class="{{classes}}" style="cursor: pointer"><i class="fa {{icon}}"></i> {{display}}</span>',
        replace: true,
        scope: {},
        link: function(scope, element, attrs, ngModelController){
            var style = {on:'text-success', off:'muted', classes: []};
            
            if(!angular.isUndefined(attrs.classes)){
                var classes = $parse(attrs.classes)(scope);
                if(Array.isArray(classes)){
                  style.classes = classes;
                }
                else {
                  style = classes;
                }
            }
            
            ngModelController.$render = function(){
                scope.display = ngModelController.$modelValue ? attrs.on : attrs.off;
                scope.classes = (ngModelController.$modelValue ? style.on : style.off) + (style.classes.length ? ' ' + style.classes.join(' ') : '');
                scope.icon = ngModelController.$modelValue ? 'fa-check-circle' : 'fa-times-circle';
            };
            
            element.on('click', function(){
                scope.$apply(function(){
                    ngModelController.$setViewValue(!ngModelController.$modelValue);
                    ngModelController.$render();
                });

            ngModelController.$render();

            });
        }
    };
});
