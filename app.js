var app = angular.module('plunker', ['ngAnimate']);

app.controller('MainCtrl', function($scope) {
  $scope.images = [];
});

app.directive('myGallery', function($http, $interval, $filter) {
  function link(scope, element, attrs) {
    if (typeof scope.feed === 'string' || scope.feed instanceof String){
      $http.get(scope.feed).success(function(data) {
          scope.images = data;
          setImages();
      });
    } else {
      scope.images = scope.feed;
      setImages();
    }
    
    function setImages(){
          scope.sortedImages = scope.images;
          scope.images.forEach(function(image){ 
            image.date = new Date(image.date); 
          });
          if (localStorage["blist"] != undefined){
            scope.blacklist = JSON.parse(localStorage["blist"]);
          }
          scope.blacklist.forEach(function(img){
            var idx = scope.images.map(function(e) { return e.url; }).indexOf(img.url);
            scope.images.splice(idx,1);
          });
          scope.mainImage = scope.images[0];
    }
    
    scope.setImage = function(image) {
      scope.mainImage = image;
      scope.modalShown = true;
    };
    
    scope.deleteImage = function($event){
      $event.stopPropagation();
      console.log(scope.blacklist);
      if (scope.blacklist == undefined){
        scope.blacklist = [scope.mainImage];
      }
      scope.blacklist.push(scope.mainImage);
      localStorage.setItem("blist", JSON.stringify(scope.blacklist));
      delImg = scope.mainImage;
      scope.nextImage();
      scope.images.splice(scope.images.indexOf(delImg), 1);
      scope.sortedImages.splice(scope.sortedImages.indexOf(delImg), 1);
      
    }
    
    scope.slideShow = function(){
      scope.setImage(scope.sortedImages[0]);
      scope.stop = $interval(function(){
        scope.nextImage();
      }, scope.autoRotateTime*1000);
    }
    
    scope.curPage = 0;
    scope.numberOfPages = function() {
      if (scope.pagination == false){
        scope.resultsPerPage = undefined;
        return 1;
      }
				return Math.ceil(scope.images.length / scope.resultsPerPage);
			};
			
			
    scope.modalShown = false;
    scope.toggleModal = function() {
    };
    
    
    scope.showModal = true;
    scope.toggleModal = function(){
        scope.showModal = !scope.showModal;
    };
    
    scope.$watch('sortBy', function(){
      scope.sortedImages = $filter('orderBy')(scope.images, scope.sortBy);
    });
    
    scope.nextImage = function(){
      var curr = scope.sortedImages.indexOf(scope.mainImage);
      if (curr == (scope.images.length - 1)){
        scope.mainImage = scope.sortedImages[0];
      } else {
        scope.mainImage = scope.sortedImages[curr + 1];
      }
    }
    
    scope.prevImage = function(){
      var curr = scope.sortedImages.indexOf(scope.mainImage);
      if (curr == 0){
        curr = scope.sortedImages.length;
      }
      scope.mainImage = scope.sortedImages[curr - 1];
    }
  }
  return {
    restrict: 'E',
    scope: {
      images: '=',
      feed: '=',
      search: '=',
      pagination: '=',
      resultsPerPage: '@',
      sorting: '=',
      autoRotateTime: '='
    },
    templateUrl: 'gallery.html',
    link: link,
    controller: function($scope){//maybe pass to link
        $scope.search = angular.isDefined($scope.search) ? $scope.search : true;
        $scope.pagination = angular.isDefined($scope.pagination) ? $scope.pagination : true;
        $scope.resultsPerPage = angular.isDefined($scope.resultsPerPage) ? $scope.resultsPerPage : 10;
        $scope.sorting = angular.isDefined($scope.sorting) ? $scope.sorting : true;
        $scope.autoRotateTime = angular.isDefined($scope.autoRotateTime) ? $scope.autoRotateTime : 4000;
      }
  };
});

app.directive('checkImage', function($http) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            attrs.$observe('ngSrc', function(ngSrc) {
                $http.get(ngSrc).success(function(){
                }).error(function(){
                    element.attr('src', 'http://www.clker.com/cliparts/f/Z/G/4/h/Q/no-image-available-md.png'); // set default image
                });
            });
        }
    };
});

app.directive('modalDialog', function($interval) {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true,
    transclude: true,
    link: function(scope, element, attrs) {
      
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
        if (angular.isDefined(scope.$parent.stop)) {
          $interval.cancel(scope.$parent.stop);
          scope.$parent.stop = undefined;
        }
        
      };
    },
    templateUrl: "modal.html"
  };
});

app.filter('pagination', function()
{
 return function(input, start)
 {
  start = +start;
  return input.slice(start);
 };
});

app.directive("imageChange", function ($timeout) {
    return {
        restrict: "A",
        scope: {},
        link: function (scope, element, attrs) {
            element.on("load", function () {
                $timeout(function () {
                    element[0].classList.remove("ng-hide-fade");
                    element[0].classList.add("ng-show");
                }, 500);
            });
            attrs.$observe("ngSrc", function () {
                element[0].classList.remove("ng-show");
                element[0].classList.add("ng-hide-fade");
            });
        }
    }
});