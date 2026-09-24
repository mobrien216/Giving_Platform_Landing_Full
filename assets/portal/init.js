/* portal page start-up (multi-page build) */
(function(){
  applyLogo();
  $('#topLogo').innerHTML = logo('t-logo');
  $('#drLogo').innerHTML = logo('', true);
  var q = new URLSearchParams(location.search);
  var fund = q.get('fund'); if (fund && FUNDS.some(function(f){ return f.id === fund; })){ S.fundId = fund; save(); }
  var want = routeFromHash() || 'home';
  var forced = q.has('signin');                        /* arriving from the landing page's Log-In */
  if (forced || fund){ try{ history.replaceState(null, '', location.pathname + location.hash); }catch(e){} }
  var session = false; try{ session = !forced && sessionStorage.getItem('tcf_portal_session') === '1'; }catch(e){}
  if (session){ S.signedIn = true; go(want, null, true); }
  else { S.signedIn = false; save(); window.PENDING_ROUTE = want === 'signin' ? 'home' : want; ROUTE = 'signin'; render(); }
})();
