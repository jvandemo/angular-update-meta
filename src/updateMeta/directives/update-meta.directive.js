angular.module('updateMeta')

  /**
   * Update a meta tag dynamically
   *
   * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
   *
   * @constructor
   */
	.directive('updateMeta',
		[          '$log',
			function ($log) {
				function updateTitle(title) {
					if(!document) {
						$log.error('updateMeta: document is not available!');
						return;
					}

					if(typeof title === 'undefined') {
						$log.error('updateMeta: title must be defined!');
						return;
					}
					
					document.title = title;
				}
				
				function updateAttribute(selector, attributeName, attributeValue) {
					if(!document) {
						$log.error('updateMeta: document is not available!');
						return;
					}

					if (!selector) {
						$log.error('updateMeta: Either of "name", "httpEquiv", "property" or "charset" must be provided!');
						return;
					}

					var el = document.querySelector(selector);
					if (el && el.setAttribute) {
						el.setAttribute(attributeName, attributeValue);
					}
				}

				return {
					restrict: 'E',
					scope: {
						charset: '@',
						name: '@',
						content: '@',
						httpEquiv: '@',
						scheme: '@',
						title: '@',
						property: '@'
					},
					link: function(scope, element, attributes) {
						var selector;

						if(scope.name) {
							selector = 'meta[name="' + scope.name + '"]';
						}

						if(scope.httpEquiv) {
							selector = 'meta[http-equiv="' + scope.httpEquiv + '"]';
						}

						if(scope.property) {
							selector = 'meta[property="' + scope.property + '"]';
						}

						// watch the content parameter and set the changing value as needed
						scope.$watch('content', function (newValue, oldValue) {
							if (typeof newValue !== 'undefined') {
								updateAttribute(selector, 'content', scope.content);
							}
						});

						// watch the charset parameter and set it as needed
						scope.$watch('charset', function (newValue, oldValue) {
							if (typeof newValue !== 'undefined') {
								updateAttribute('meta[charset]', 'charset', scope.charset);
							}
						});
						
						// watch the value and set as needed
						// use document instead of $document as $document doesn't work here
						scope.$watch('title', function (newValue, oldValue) {
							updateTitle(newValue);
						});
					}
				};
			}
		]
	);