module.exports = UserResourceProvider;

function UserResourceProvider() {
	'use strict';
	'ngInject';

	var provider = this;

	provider.apiEndpoint = 'http://localhost:8008/api';

	provider.$get = UserResourceFactory;

	function UserResourceFactory($resource) {
		'ngInject';

		return $resource(provider.apiEndpoint + '/users/:id', {}, {
			get: {
				cache: true
			}
		});
	}
}