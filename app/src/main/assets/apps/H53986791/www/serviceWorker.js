var VERSION = 'v1';
self.addEventListener('install',function(event){
    event.waitUntil(
        caches.open(VERSION)
        .then(cache=>{
            return cache.addAll([
				'/js/angualr.js',
				'/js/common.js',
				'/js/immersed.js',
				'/js/index.js',
				'/js/jquery.js',
				'/js/mui.js',
				'/js/mui.min.js',
				'/js/mui.picker.min.js',
				'/js/mui.previewimage.js',
				'/js/mui.pullrefresh.js',
				'/js/mui.zoom.js',
				'/js/utitls.js',
				'/css/app.css',
				'/css/border.css',
				'/css/circle.css',
				'/css/common.css',
				'/css/feedback-page.css',
				'/css/font-awesome.min.css',
				'/css/iconfont.css',
				'/css/icons-extra.css',
				'/css/mui.css',
				'/css/mui.min.css',
				'/css/mui.picker.css',
				'/css/yulan.css'
            ])
        })
    )
    console.log("this is install......");
});
self.addEventListener('fetch',function(event){
	console.log("this is fetch......");
	console.log(event.request);
    event.respondWith(
    	caches.match(event.request)
    	.then(response => {
    		if(response){
    			console.log('Found response in cache :',response);
    			return response;
    		}
    		var fetchRequest = event.request.clone();
    		return fetch(fetchRequest)
    		.then(response => {
    			if(!response || response.status !==200){
    				return response;
    			}
    			console.log('Response from network is :',response);
    			var responseToCache = response.clone();
    			caches.open(VERSION)
    			.then(cache => {
    				cache.put(event.request,responseToCache);
    			})
    			return response;
    		})
    	})
    )
})
self.addEventListener('activate',function(event){
	console.log("this is activate......");
	event.waitUntil(
		caches.keys()
		.then(cacheNames => {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName !== VERSION){
						return caches.delete(cacheName);
					}
				})
			)
		})
	)
})