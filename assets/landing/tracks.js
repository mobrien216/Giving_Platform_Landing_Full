/* ============================================================
   LANDING → THE THREE TRACKS (multi-page build)
   Log-In / "I have a fund here" → portal/        (sign-in → dashboard)
   Community Member → Continue   → community/
   Advisor → Continue            → advisors/
   Non-profit Partner            → Grantee Portal · portal/ (org fund) · help form
   ============================================================ */
var SITE = { portal:'portal/', community:'community/', advisors:'advisors/',
             map:'tools/impact-map.html', calc:'tools/impact-calculator.html' };
var REG_KEY = 'tcf_registration';
function tcfGo(url){ try{ closePopup(); }catch(e){} location.href = url; }

/* Track 1 — every Log-In skips the info window and opens the portal's sign-in */
enterPortal = function(){ tcfGo(SITE.portal + '?signin=1'); };
var __openPopup = openPopup;
openPopup = function(key){ if (key === 'login'){ enterPortal(); return; } return __openPopup.apply(this, arguments); };

/* Tracks 2 & 3 — Continue on "Tell us a little more" */
submitTellUs = function(){
  var val = function(id){ return ((document.getElementById(id) || {}).value || '').trim(); };
  var picks = function(sel){ return Array.prototype.map.call(document.querySelectorAll(sel), function(b){ return b.textContent; }); };
  var email = val('tuEmail');
  if (email && email.indexOf('@') < 0){ showToast('That email doesn\u2019t look right \u2014 check it, or leave it blank for now.'); return; }
  var reg = { segment: REG_SEGMENT, subtype: REG_SUBTYPE, name: val('tuName'), email: email,
              interests: picks('#tuInterests .chip.sel'), at: Date.now() };
  try{ localStorage.setItem(REG_KEY, JSON.stringify(reg)); }catch(e){}
  tcfGo(REG_SEGMENT === 'advisor' ? SITE.advisors : SITE.community);
};

/* Landing tools open in the same full-screen shell, loaded only when asked for */
function openTool(id, url){
  closePopup(); document.getElementById('msheet').classList.remove('open');
  var shell = document.getElementById(id + 'Shell'), veil = document.getElementById(id + 'Veil'), fr = document.getElementById(id + 'Frame');
  shell.classList.add('on'); shell.setAttribute('aria-hidden','false'); document.body.classList.add('portal-on');
  if (!fr.getAttribute('src')){ veil.classList.remove('gone'); fr.addEventListener('load', function(){ veil.classList.add('gone'); }, {once:true}); fr.setAttribute('src', url); }
  else veil.classList.add('gone');
}
enterMap  = function(){ openTool('map',  SITE.map); };
enterCalc = function(){ openTool('calc', SITE.calc); };
/* ============================================================
   NON-PROFIT PARTNERS — one door, three destinations
   ============================================================ */
/* Paste the live Grantee Portal address here. While blank, the
   "Grantee Portal" choice shows the existing Coming-soon window. */
var GRANTEE_PORTAL_URL = '';
var NP_ARROW = '<svg class="p-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17L17 7M8 7h9v9"/></svg>';
function npCell(kick, color, title, sub, onclick, meta){
  return '<button class="pop-cell" style="min-height:96px;" onclick="' + onclick + '">' + NP_ARROW
    + '<div class="pc-kick" style="color:' + color + ';">' + kick + '</div>'
    + '<div class="pc-title" style="font-size:18px;">' + title + '</div>'
    + '<div class="pc-sub">' + sub + '</div>'
    + (meta ? '<div class="pc-sub" style="font-family:var(--f-ledger);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3);margin-top:8px;">' + meta + '</div>' : '')
    + '</button>';
}
POPUPS.nonprofit = {k:'Non-profit Partners', t:'What are you looking for?', h:function(){
  return '<div class="pop-pad"><p class="lede">Are you looking to access the <b>Grantee Portal</b>, your <b>organizational fund account</b>, or something else?</p></div>'
    + '<div class="pop-grid" style="grid-template-columns:1fr;">'
    + npCell('Grants', 'var(--moss)', 'Grantee Portal', 'Apply for a grant, submit a report, or check on an application.', 'openGranteePortal()', GRANTEE_PORTAL_URL ? 'Opens the Grantee Portal \u2197' : 'Grantee Portal \u00b7 opens separately \u2197')
    + npCell('Your fund', 'var(--forest)', 'Org Fund Account', 'Balances, fiscal-year statements, distributions, and your QR code to give.', 'openOrgFund()', 'Sign in to the Giving Portal \u2192')
    + npCell('Anything else', 'var(--emberDeep,#D3591B)', 'Something else', 'Starting a fund, a partnership, a program question \u2014 or not sure where to start.', "openPopup('nonprofitother',true)", 'Talk with our team \u2192')
    + '</div>'
    + '<div class="pop-pad" style="padding-top:16px;"><p style="font-size:11.5px;color:var(--ink-3);">Grant applications and reporting live in the Grantee Portal. Organizational fund balances and statements live in the Giving Portal.</p></div>';
}};
POPUPS.nonprofitother = {k:'Non-profit Partners', t:'How can we help?', h:function(){
  var topics = ['Becoming a grantee','Starting an organizational fund','A question for a program officer','Partnership or media','Something else'];
  return '<div class="pop-pad"><p class="lede">Tell us a little about what you need and the right person on our team will get back to you.</p>'
    + '<div class="f-row" style="margin-top:16px;"><label>What\u2019s this about?</label><div class="chip-row" id="npTopic">' + topics.map(function(t,i){ return '<button class="chip' + (i===0?' sel':'') + '" onclick="chipPick(this)">' + t + '</button>'; }).join('') + '</div></div>'
    + '<div class="f-row"><label for="npOrg">Organization</label><input id="npOrg" placeholder="Your nonprofit\u2019s name"></div>'
    + '<div class="f-row"><label for="npEmail">Your email</label><input id="npEmail" type="email" placeholder="you@yourorg.org"></div>'
    + '<div class="f-row"><label for="npMsg">Message (optional)</label><textarea id="npMsg" style="width:100%;min-height:96px;padding:13px 15px;border:1px solid var(--line-2);border-radius:13px;background:var(--paper);font:inherit;font-size:16px;resize:vertical;line-height:1.5;" placeholder="A sentence or two is plenty."></textarea></div>'
    + '<button class="btn btn-accent btn-block btn-lg" onclick="submitNonprofitHelp()">Send to our team</button>'
    + '<div class="facts" style="margin-top:18px;"><div class="fr"><span class="fk">Phone</span><span class="fv">216.861.3810</span></div><div class="fr"><span class="fk">Email</span><span class="fv">hello@clevefdn.org</span></div></div></div>';
}};
function openGranteePortal(){
  if (GRANTEE_PORTAL_URL){ window.open(GRANTEE_PORTAL_URL, '_blank', 'noopener'); closePopup(); }
  else openPopup('granteeholding', true);
}
/* Org fund holders go to the same sign-in, with their organizational fund
   already selected for the dashboard. */
var PORTAL_KEY = 'tcf-donor-portal-profile-v1';
function openOrgFund(){
  try{ var st = JSON.parse(localStorage.getItem(PORTAL_KEY) || 'null'); if (st){ st.fundId = 'eac'; localStorage.setItem(PORTAL_KEY, JSON.stringify(st)); } else localStorage.setItem(PORTAL_KEY, JSON.stringify({fundId:'eac'})); }catch(e){}
  enterPortal();
  var tries = 0, t = setInterval(function(){
    tries++;
    try{ var w = document.getElementById('portalFrame').contentWindow; if (w && w.S){ w.S.fundId = 'eac'; w.save(); clearInterval(t); } }catch(e){}
    if (tries > 40) clearInterval(t);
  }, 150);
}
function submitNonprofitHelp(){
  var email = (document.getElementById('npEmail').value || '').trim();
  if (email.indexOf('@') < 0){ showToast('Add an email so we can reply.'); return; }
  var topic = (document.querySelector('#npTopic .chip.sel') || {}).textContent || 'General';
  closePopup();
  showToast('Thanks \u2014 our team will reply about \u201c' + topic + '\u201d within two business days.');
}

/* site build: the org fund door opens the portal with the organizational fund selected */
openOrgFund = function(){ tcfGo(SITE.portal + '?signin=1&fund=eac'); };

/* deep link from other pages: index.html#join opens "Join the Community" */
if (location.hash === '#join') setTimeout(function(){ hideGreeter(true); openPopup('register'); }, 400);

/* speed: once the landing page is idle, quietly warm the cache for the next page */
(function(){
  var urls = [SITE.portal, SITE.community, SITE.advisors,
              'assets/portal/portal.css', 'assets/portal/app.js', 'assets/portal/data.js',
              'assets/giving/giving.css', 'assets/giving/map-and-grants.js'];
  function warm(){ urls.forEach(function(u){ var l = document.createElement('link'); l.rel = 'prefetch'; l.href = u; document.head.appendChild(l); }); }
  if ('requestIdleCallback' in window) requestIdleCallback(warm, {timeout: 4000}); else setTimeout(warm, 2500);
})();
