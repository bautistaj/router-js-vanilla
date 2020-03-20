class Router {
    constructor(reoutes) {
        this.reoutes = reoutes;
        this._loadInitialRoute();
    }

    loadRoute(...urlSegs) {
        const matchedRoute = this._matchUrlRoute(urlSegs);
        
        const url = `/${urlSegs.join('/')}`;
        history.pushState({}, 'this works',url);

        const routerOutElement = document.querySelectorAll('[data-router]')[0];
        console.log('matchedRoute: ',matchedRoute);
        
        if (matchedRoute) {
            routerOutElement.innerHTML = matchedRoute.template;
        }
    }

    /**
     * Init Routes
     */
    _loadInitialRoute() {
        const pathNameSplit = window.location.pathname.split('/');
        const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';
        this.loadRoute(...pathSegs);
    }

    /**
     * 
     * @param {*} urlSegs 
     */
    _matchUrlRoute(urlSegs) {
        console.log("urlSegs: ",urlSegs);
        
        const matchedRoute = this.reoutes.find( route => {
            console.log('route: ',route);
            
            const routePathSegs = route.path.split('/').slice('1');
            console.log('routePathSegs ',routePathSegs);
            
            if (routePathSegs.length !== urlSegs.length) {
                return false;
            }

            return routePathSegs.every((routPathSegment, i) => routPathSegment === urlSegs[i]);
        });

        return matchedRoute;
    }
}