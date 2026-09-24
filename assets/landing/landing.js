
/* ============ MOTION FLAGS ============ */
var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============ NAV CHROME ============ */
window.addEventListener('scroll', function(){
  document.body.classList.toggle('scrolled', window.scrollY > 14);
}, { passive:true });
function toggleSheet(){ document.getElementById('msheet').classList.toggle('open'); }

/* ============ TOAST ============ */
var toastTimer;
function showToast(msg){
  var t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ t.classList.remove('show'); }, 3200);
}

/* ============================================================
   POP-UP CONTENT WINDOWS
   Deck: "ALL content lives inside each window as a pop-out
   function." Single shell, swappable content, back-stack.
   ============================================================ */
var popStack = [];
var PILLARS = [
  { name:'Grow Our Region', color:'var(--p-region)', goal:'Advance the region\'s competitiveness and grow good jobs in Cleveland.', pts:['Make Cleveland a go-to place to locate and expand a business','Grow talent through a robust workforce development system','Promote and protect regional assets — arts, culture, and the natural environment'] },
  { name:'Invest in Vibrant Neighborhoods', color:'var(--p-neigh)', goal:'Ensure all Clevelanders live in an asset-rich neighborhood.', pts:['Promote holistic community well-being with the full portfolio of resources','Prevent displacement, welcome new residents, and build neighborhood wealth','Use land and development to drive impact and preserve cultural legacy'] },
  { name:'Connect People to Prosperity', color:'var(--p-pros)', goal:'Reimagine systems to drive economic stability and mobility at scale.', pts:['Accelerate access to quality education from cradle to career','Eliminate barriers and strengthen pathways to family-sustaining jobs','Promote wealth-building opportunities for all'] }
];
var IMMEDIATE = [
  { name:'Well-being & Critical Needs', color:'var(--p-well)', sub:'Respond to ongoing community needs and priorities.' },
  { name:'New Ideas', color:'var(--p-new)', sub:'Fund pilots and innovations that meet emerging needs.' },
  { name:'Organizational Sustainability & Leadership', color:'var(--p-org)', sub:'Strengthen nonprofit business models and effectiveness.' },
  { name:'Capital Projects', color:'var(--p-region)', sub:'Back transformative brick-and-mortar community projects.' }
];
function pillarCards(){
  return PILLARS.map(function(p){
    return '<div class="pop-cell pillar-spine" style="--spine:'+p.color+';cursor:default;min-height:0;">'
      +'<div class="pc-kick" style="color:'+p.color+';">Long-term pillar</div>'
      +'<div class="pc-title" style="margin-top:6px;">'+p.name+'</div>'
      +'<div class="pc-sub" style="font-weight:600;color:var(--ink);">'+p.goal+'</div>'
      +'<div class="pc-sub">'+p.pts.map(function(x){return '· '+x;}).join('<br/>')+'</div>'
      +'</div>';
  }).join('');
}
function immediateCards(){
  return IMMEDIATE.map(function(c){
    return '<div class="pop-cell pillar-spine" style="--spine:'+c.color+';cursor:default;min-height:0;">'
      +'<div class="pc-title" style="margin-top:0;font-size:16px;">'+c.name+'</div>'
      +'<div class="pc-sub">'+c.sub+'</div></div>';
  }).join('');
}
var ORG_WINDOWS = {
  'org-hq':{k:'The foundation',t:'Headquarters',h:'<div class="pop-pad"><p class="lede">The foundation works from 6601 Euclid Avenue in MidTown — a headquarters built to be a community hub, not a fortress: open doors, public spaces, and neighbors in the building every day.</p><div class="facts" style="margin-top:18px;"><div class="fr"><span class="fk">Address</span><span class="fv">6601 Euclid Ave, Cleveland OH 44103</span></div><div class="fr"><span class="fk">District</span><span class="fv">MidTown · Health-Tech Corridor</span></div><div class="fr"><span class="fk">Open since</span><span class="fv">2023</span></div></div></div>'},
  'org-board':{k:'The foundation',t:'Board & Staff',h:'<div class="pop-pad"><p class="lede">A community board of directors and a staff of program, philanthropy, and investment professionals steward the endowment on Cleveland\'s behalf.</p><p style="margin-top:14px;">Recent appointments include Dr. Cristina González Alcalá as Director of Connecting People to Prosperity, and Cathy O\'Malley Kearney of KeyBank as chair of the foundation\'s bank trustees.</p></div>'},
  'org-leadership':{k:'The foundation',t:'Leadership Development',h:'<div class="pop-pad"><p class="lede">Building Cleveland\'s next generation of public leaders — including the Public Service Fellowship, now celebrating ten years and welcoming its 2026–27 cohort, and the foundation\'s summer internship program.</p></div>'},
  'org-awards':{k:'The foundation',t:'Awards',h:'<div class="pop-pad"><p class="lede">Home of the Anisfield-Wolf Book Awards — honoring literature that confronts racism and celebrates diversity since 1935. The 2026 winners, a landmark year of debut voices, will be celebrated September 18–19 with a weekend of community events.</p></div>'},
  'org-midtown':{k:'The foundation',t:'Warren E. Anderson MidTown Collaboration Center',h:'<div class="pop-pad"><p class="lede">Named in 2026 for Warren E. Anderson following a transformative investment, the Collaboration Center anchors the foundation\'s campus — home to partners like the Sixty6 Music Lounge & Studio, which just marked its first year.</p></div>'},
  'org-contact':{k:'The foundation',t:'Contact Us',h:'<div class="pop-pad"><div class="facts"><div class="fr"><span class="fk">Phone</span><span class="fv">216.861.3810</span></div><div class="fr"><span class="fk">Email</span><span class="fv">hello@clevefdn.org</span></div><div class="fr"><span class="fk">Visit</span><span class="fv">6601 Euclid Ave, Cleveland OH 44103</span></div><div class="fr"><span class="fk">Checks</span><span class="fv">P.O. Box #77051, Cleveland OH 44194-0015</span></div></div><button class="btn btn-primary btn-block" style="margin-top:16px;" onclick="closePopup();showToast(\'A member of the team will reach out within one business day.\')">Send a message</button></div>'}
};
function orgGrid(){
  var items = [['org-hq','Headquarters'],['org-board','Board & Staff'],['org-leadership','Leadership Development'],['org-awards','Awards'],['org-midtown','MidTown Collaboration'],['org-contact','Contact Us']];
  return '<div class="pop-grid" style="grid-template-columns:repeat(2,1fr);">'+items.map(function(it){
    return '<button class="pop-cell" style="min-height:96px;" onclick="openPopup(\''+it[0]+'\',true)">'
      +'<svg class="p-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17L17 7M8 7h9v9"/></svg>'
      +'<div class="pc-title" style="margin-top:0;font-size:16px;">'+it[1]+'</div></button>';
  }).join('')+'</div>';
}

var POPUPS = {
  priorities:{k:'What we do',t:'Our Priorities',h:function(){return '<div class="pop-pad"><p class="lede">Together with donors, nonprofit partners, and residents, the foundation is working toward one shared vision: a vibrant Northeast Ohio where no Clevelander is left behind. The full toolbox is in play — grantmaking, investing, public policy, and partnerships.</p></div>'
    +'<div class="pop-grid">'
    +'<button class="pop-cell" onclick="openPopup(\'agenda\',true)"><svg class="p-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17L17 7M8 7h9v9"/></svg><div class="pc-kick">The one-pager</div><div class="pc-title">Impact Agenda</div><div class="pc-sub">How every dollar links to the vision.</div></button>'
    +'<button class="pop-cell" onclick="openPopup(\'longterm\',true)"><svg class="p-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17L17 7M8 7h9v9"/></svg><div class="pc-kick">Three pillars</div><div class="pc-title">Long-term Impact</div><div class="pc-sub">Region · Neighborhoods · Prosperity.</div></button>'
    +'<button class="pop-cell" onclick="openPopup(\'immediate\',true)"><svg class="p-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17L17 7M8 7h9v9"/></svg><div class="pc-kick">Four responses</div><div class="pc-title">Immediate Impact</div><div class="pc-sub">Meeting needs as they arise.</div></button>'
    +'</div>'
    +'<div class="pop-pad"><h4>The foundation</h4></div>'+orgGrid()
    +'<div class="pop-pad" style="padding-top:18px;"><button class="btn btn-accent" onclick="openPopup(\'give\')">Fund this work — Give Now</button></div>';}},
  agenda:{k:'Our priorities',t:'The Impact Agenda',h:function(){return '<div class="pop-pad"><p class="lede">One page, one promise: every dollar the foundation stewards is intentionally linked to the priorities that move Cleveland closer to its vision — supporting immediate needs while making the long-term investments the region requires.</p><h4>Grantmaking for long-term impact</h4></div>'
    +'<div class="pop-grid">'+pillarCards()+'</div>'
    +'<div class="pop-pad"><h4>Grantmaking for immediate impact</h4></div>'
    +'<div class="pop-grid" style="grid-template-columns:repeat(2,1fr);">'+immediateCards()+'</div>'
    +'<div class="pop-pad"><div class="facts"><div class="fr"><span class="fk">Also in the toolbox</span><span class="fv">Investing · Public policy · Partnerships</span></div></div></div>';}},
  longterm:{k:'Our priorities',t:'Grantmaking for Long-term Impact',h:function(){return '<div class="pop-pad"><p class="lede">Deep, patient investment at three levels — the region, the neighborhood, and the individual — to drive success for all.</p></div><div class="pop-grid">'+pillarCards()+'</div>';}},
  immediate:{k:'Our priorities',t:'Grantmaking for Immediate Impact',h:function(){return '<div class="pop-pad"><p class="lede">Alongside the long game: strengthening local nonprofits and meeting new and immediate needs as they arise.</p></div><div class="pop-grid" style="grid-template-columns:repeat(2,1fr);">'+immediateCards()+'</div>';}},
  givingforward:{k:'Why we do it',t:'Giving Forward',h:function(){return '<div class="pop-pad"><p class="lede">When we give forward together, we build a stronger Cleveland for everyone. Every contribution — no matter the size — fuels impact across Greater Cleveland, so generosity becomes progress that carries the city into its next century.</p><h4>Give forward, not just back</h4><p>The foundation partners with donors who want more than a thank-you note: people investing in bold solutions to the region\'s biggest challenges and planting seeds for change they may never sit in the shade of.</p></div>'
    +'<div class="pop-grid">'
    +'<button class="pop-cell" onclick="openPopup(\'video\',true)"><svg class="p-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17L17 7M8 7h9v9"/></svg><div class="pc-kick">The campaign</div><div class="pc-title">You\'re the Reason</div><div class="pc-sub">Watch the film.</div></button>'
    +'<button class="pop-cell" onclick="closePopup();showToast(\'Giving Forward Magazine — Winter issue. Print & digital, mailed to all fundholders.\')"><svg class="p-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17L17 7M8 7h9v9"/></svg><div class="pc-kick">The publication</div><div class="pc-title">Giving Forward Magazine</div><div class="pc-sub">Big bets, refined priorities, founder\'s vision.</div></button>'
    +'<button class="pop-cell" onclick="openPopup(\'give\',true)"><svg class="p-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17L17 7M8 7h9v9"/></svg><div class="pc-kick">The invitation</div><div class="pc-title">Make a Gift</div><div class="pc-sub">$25 or $2,000 — be part of what\'s possible.</div></button>'
    +'</div>';}},
  connected:{k:'Join us',t:'Stay Connected',h:function(){return '<div class="pop-pad"><p class="lede">Newsletters matched to your interests, events across the city, and a direct line to the people of the foundation.</p><div class="f-row" style="margin-top:18px;"><label>Email address</label><input type="email" id="nlEmail" placeholder="you@cleveland.com"/></div><label style="display:block;font-family:var(--f-ledger);font-size:10px;font-weight:600;color:var(--forest);margin-bottom:9px;text-transform:uppercase;letter-spacing:.12em;">Interests</label><div class="chip-row" id="nlChips"><button class="chip sel" onclick="this.classList.toggle(\'sel\')">Community news</button><button class="chip" onclick="this.classList.toggle(\'sel\')">Donor stories</button><button class="chip" onclick="this.classList.toggle(\'sel\')">Grants &amp; nonprofits</button><button class="chip" onclick="this.classList.toggle(\'sel\')">Events</button><button class="chip" onclick="this.classList.toggle(\'sel\')">Anisfield-Wolf</button></div><button class="btn btn-accent btn-block" style="margin-top:18px;" onclick="subscribeNl()">Subscribe to newsletters</button><h4 style="margin-top:28px;">Contact</h4><div class="facts"><div class="fr"><span class="fk">Phone</span><span class="fv">216.861.3810</span></div><div class="fr"><span class="fk">Email</span><span class="fv">hello@clevefdn.org</span></div><div class="fr"><span class="fk">Visit</span><span class="fv">6601 Euclid Ave, Cleveland OH 44103</span></div></div></div>';}},
  give:{k:'Give now',t:'Be part of what\'s possible',h:function(){return '<div class="pop-pad"><p class="lede">For more than a century, Clevelanders have powered this foundation by giving forward together — whether $25 or $2,000.</p><div class="amt-grid" style="margin-top:18px;"><button onclick="pickAmt(this,25)">$25</button><button onclick="pickAmt(this,100)">$100</button><button class="sel" onclick="pickAmt(this,250)">$250</button><button onclick="pickAmt(this,500)">$500</button><button onclick="pickAmt(this,2000)">$2,000</button><button onclick="pickAmt(this,0)">Other</button></div><div class="f-row"><label>Gift amount</label><input type="text" id="giveAmount" value="$250" class="ledger" inputmode="numeric"/></div><div class="f-row"><label>Direct my gift to</label><select id="giveTarget">' + (GIVE_TARGET ? '<option selected>' + GIVE_TARGET + '</option>' : '') + '<option>Greatest needs — community grantmaking</option><option>Grow Our Region</option><option>Invest in Vibrant Neighborhoods</option><option>Connect People to Prosperity</option><option>Well-being &amp; Critical Needs</option></select></div><div class="f-row"><label>Frequency</label><select><option>One time</option><option>Monthly</option><option>Annually</option></select></div><button class="btn btn-accent btn-block btn-lg" onclick="submitGift()">Give forward</button><p style="font-size:11.5px;color:var(--ink-3);margin-top:12px;">Processed securely. Gifts by check: P.O. Box #77051, Cleveland OH 44194-0015.</p></div>';}},
  login:{k:'Donors',t:'The Giving Portal',h:function(){return '<div class="pop-pad"><p class="lede">Your fund, live: balances synced from Ren iPhi, one-tap grant recommendations, statements, and the impact map — the modern donor portal for Cleveland Foundation fundholders.</p><div class="facts" style="margin-top:16px;"><div class="fr"><span class="fk">Identity</span><span class="fv">Microsoft Entra External ID · MFA</span></div><div class="fr"><span class="fk">Fund data</span><span class="fv">Ren iPhi · live sync</span></div><div class="fr"><span class="fk">New here?</span><span class="fv">Open a fund from $10,000</span></div></div><div style="display:flex;gap:10px;margin-top:18px;flex-wrap:wrap;"><button class="btn btn-primary btn-lg" style="flex:1;" onclick="enterPortal()">Log in to the portal →</button><button class="btn btn-quiet btn-lg" style="flex:1;" onclick="closePopup();showToast(\'A philanthropy advisor will reach out about opening a fund.\')">Open a fund</button></div><p style="font-size:11.5px;color:var(--ink-3);margin-top:12px;">Prototype note: the full Giving Portal is embedded in this file — logging in opens it right here. One download, whole ecosystem.</p></div>';}},
  video:{k:'The campaign',t:'Cleveland, You\'re the Reason — Film',h:function(){return '<div class="pop-pad"><div class="story-hero" style="background:linear-gradient(#0E3322 45%,var(--forest));display:flex;align-items:center;justify-content:center;"><div style="text-align:center;position:relative;z-index:2;"><div style="width:78px;height:78px;border-radius:20px;border:1px dashed rgba(255,255,255,.42);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.8);margin:0 auto 14px;"><svg width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"6\" width=\"14\" height=\"12\" rx=\"2.5\"/><path d=\"M16 10.2l5.4-2.8v9.2L16 13.8z\"/></svg></div><div class="ledger" style="color:#8FB4A2;font-size:10px;letter-spacing:.2em;text-transform:uppercase;">Campaign film · video build pending</div></div></div><p class="lede">The campaign story in ninety seconds: giving was invented here in 1914, and every generation of Clevelanders since has been the reason it works. The final spot lands here; this window carries the animatic and storyboard until then.</p><div class="chip-row" style="margin-top:14px;"><button class="chip" onclick="closePopup();openPopup(\'givingforward\')">Why we give forward →</button></div></div>';}},
  calculator:{k:'Explore the impact',t:'Impact Calculator',h:function(){return '<div class="pop-pad"><div class="pop-grid-2" style="display:grid;gap:22px;grid-template-columns:1fr;align-items:start;">'
    +'<div><div class="f-row"><label>A gift of <span class="ledger" id="calcAmtLabel">$1,000</span></label><input type="range" id="calcAmt" min="100" max="25000" step="100" value="1000" oninput="runCalc()"/></div>'
    +'<div class="f-row"><label>Endowed for <span class="ledger" id="calcYrsLabel">25 years</span></label><input type="range" id="calcYrs" min="5" max="100" step="5" value="25" oninput="runCalc()"/></div>'
    +'<p style="font-size:12.5px;color:var(--ink-3);">Modeled on the endowment\'s long-run average (~6%) with an annual community payout — the same math that has kept 1914\'s gifts granting in 2026.</p></div>'
    +'<div class="calc-out"><div class="co-cap">Total granted over the period</div><div class="co-big num" id="calcTotal">$1,480</div><div class="co-cap" id="calcNote">While the fund itself grows to $2,540</div>'
    +'<div class="calc-units"><div><div class="u-v num" id="uMeals">2,960</div><div class="u-k">Meals</div></div><div><div class="u-v num" id="uNights">52</div><div class="u-k">Shelter nights</div></div><div><div class="u-v num" id="uHours">123</div><div class="u-k">Learning hours</div></div></div></div>'
    +'</div></div>';}},
  map:{k:'Explore the impact',t:'Impact Map — 2025 Grants',h:function(){return '<div class="pop-pad"><div class="mini-map" id="miniMap"></div><p class="lede" style="margin-top:16px;">Two hundred–plus grants across six counties in 2025 — food security on the east side, workforce pipelines in MidTown, arts along Detroit Avenue, water research on the lakefront. The full interactive map with every grantee lives inside the Giving Portal.</p><div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;"><button class="btn btn-primary" onclick="openPopup(\'login\',true)">Open the full map in the portal</button><button class="btn btn-quiet" onclick="openPopup(\'give\',true)">Fund the next pin</button></div></div>';}},
  fundfinder:{k:'Explore the impact · New',t:'Fund Finder',h:function(){return '<div class="pop-pad"><p class="lede">Every named fund is a Clevelander\'s promise. Search 1,600+ of them by name or cause, and give directly to the one that\'s yours.</p><div class="f-row" style="margin-top:16px;"><label>Search funds</label><input type="text" id="ffSearch" placeholder="Try \'Black Philanthropy\' or \'Lake\'…" oninput="renderFF()"/></div><div class="chip-row" id="ffChips" style="margin-bottom:16px;"><button class="chip sel" data-ff="all" onclick="ffFilter(this)">All</button><button class="chip" data-ff="community" onclick="ffFilter(this)">Community</button><button class="chip" data-ff="affinity" onclick="ffFilter(this)">Affinity</button><button class="chip" data-ff="daf" onclick="ffFilter(this)">Donor advised</button><button class="chip" data-ff="org" onclick="ffFilter(this)">Organizational</button></div><div id="ffResults"></div><p style="font-size:11px;color:var(--ink-3);margin-top:6px;">Directory sample for prototype. Full registry syncs from Ren iPhi.</p></div>';}},
  journey:{k:'Start here',t:'Find your way in',h:function(){ return journeyHTML(); }},
  segments:{k:'Internal \u00b7 strategy view',t:'Audience segmentation \u2192 site paths',h:function(){
    return '<div class="pop-pad"><p class="lede">How the four public paths on this site map to the 2026 segmentation study. Visitors never see these labels \u2014 they see a question about what brought them here, and land on the track built for them.</p></div>'
      + '<div class="sg-grid">' + SEGMENTS.map(function(s){
          return '<div class="sg-col"><div class="sg-head" style="background:' + s.c + ';">'
            + '<div class="sg-n">' + s.n + '</div><div class="sg-d">' + s.d + '</div></div>'
            + '<div class="sg-row"><span class="sk">Size</span><span class="sv">' + s.size + '</span></div>'
            + '<div class="sg-row"><span class="sk">Median HH</span><span class="sv">' + s.inc + '</span></div>'
            + '<div class="sg-row"><span class="sk">Share of all $ given</span><span class="sv">' + s.dollars + '</span></div>'
            + '<div class="sg-row"><span class="sk">Donations local</span><span class="sv">' + s.local + '</span></div>'
            + '<div class="sg-row"><span class="sk">Already admire TCF</span><span class="sv">' + s.admire + '</span></div>'
            + '<div class="sg-row"><span class="sk">Of friends &amp; DAF list</span><span class="sv">' + s.list + '</span></div>'
            + '<div class="sg-stage"><div class="st-k">' + s.stage + '</div><div class="st-t">' + s.need + '</div>'
            + '<div class="st-t" style="color:var(--forest);font-weight:600;margin-top:7px;">Site path: ' + s.track + '</div></div>'
            + '</div>';
        }).join('') + '</div>'
      + '<div class="pop-pad"><h4>What the split implies</h4>'
      + '<p>Core is 23% of people and 76% of the dollars \u2014 already convinced, so the site should not spend its first screen convincing them. Give them the fund and the advisor fast.</p>'
      + '<p>The other 77% sit at Engage or Awareness, and two of those segments give mainly to themselves rather than the region. Asking them for money on arrival is the wrong ask; the map, the proof, and a $25 door are the right ones.</p>'
      + '<p>The registration capture is the pipeline: it converts an anonymous arrival into a known contact with a stated interest, which is what lets stewardship start at all.</p>'
      + '<p style="font-size:11.5px;color:var(--ink-3);">Indexed to total respondents. Over-index \u2265120, under-index \u226480. Source: audience segmentation study supplied for this engagement.</p></div>';
  }},
  register:{k:'Join the Community',t:'Which one is you?',h:function(){
    var doors = [
      ['Community Member','Everyday donors &amp; community leaders.',"beginRegistration('community',true)",'var(--emberDeep,#D3591B)'],
      ['Non-profit Partner','Grantees &amp; organizational funds.',"openPopup('nonprofit',true)",'var(--moss)'],
      ['Advisor','Charitable vehicles for your clients.',"beginRegistration('advisor',true)",'var(--olive)'],
      ['I have a fund here','DAF &amp; organizational fund holders.',"openPopup('login',true)",'var(--forest)']
    ];
    return '<div class="pop-pad"><p class="lede">Registering takes about thirty seconds and opens the door that fits you \u2014 tailored updates, the right tools, and a team that knows why you\u2019re here.</p></div>'
      + '<div class="pop-grid" style="grid-template-columns:repeat(2,1fr);">' + doors.map(function(d){
          return '<button class="pop-cell" style="min-height:118px;" onclick="' + d[2] + '">'
            + '<svg class="p-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17L17 7M8 7h9v9"/></svg>'
            + '<div class="pc-kick" style="color:' + d[3] + ';">I\u2019m ' + (d[0]==='Advisor'?'an':'a') + '\u2026</div>'
            + '<div class="pc-title" style="font-size:17px;">' + d[0] + '</div>'
            + '<div class="pc-sub">' + d[1] + '</div></button>';
        }).join('') + '</div>'
      + '<div class="pop-pad" style="padding-top:16px;"><p style="font-size:11.5px;color:var(--ink-3);">Not sure? Community Member is every one of us \u2014 start there.</p></div>';
  }},
  sortCommunity:{k:'Community Member',t:'Tell us a little more',h:function(){
    return '<div class="pop-pad"><p class="lede">Which best describes you? Each experience is tailored a bit differently \u2014 you can always update this later.</p></div>'
      + '<div class="pop-grid" style="grid-template-columns:1fr;">'
      + '<button class="pop-cell" style="min-height:84px;" onclick="pickSubtype(\'resident\')"><svg class="p-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17L17 7M8 7h9v9"/></svg><div class="pc-title" style="font-size:17px;">I\u2019m an active City Resident</div></button>'
      + '<button class="pop-cell" style="min-height:84px;" onclick="pickSubtype(\'civic-leader\')"><svg class="p-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17L17 7M8 7h9v9"/></svg><div class="pc-title" style="font-size:17px;">I\u2019m a Community or Civic Leader</div></button>'
      + '</div>';
  }},
  sortAdvisor:{k:'Advisor',t:'Tell us a little more',h:function(){
    var opts = [['professional-advisor','Professional Advisor'],['financial-advisor','Financial Advisor'],['estate-attorney','Estate Attorney'],['other','Other']];
    return '<div class="pop-pad"><p class="lede">Which best describes you? We\u2019ll route everyone to the same resources for now \u2014 this just helps us understand who\u2019s here.</p></div>'
      + '<div class="pop-grid" style="grid-template-columns:repeat(2,1fr);">'
      + opts.map(function(o){
          return '<button class="pop-cell" style="min-height:84px;" onclick="pickSubtype(\'' + o[0] + '\')"><svg class="p-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17L17 7M8 7h9v9"/></svg><div class="pc-title" style="font-size:16px;">' + o[1] + '</div></button>';
        }).join('')
      + '</div>';
  }},
  tellus:{k:'Tell us a little more',t:'Tell us a little more about you',h:function(){
    var interestItems = ['Arts & Culture','Public Education','Neighborhood Revitalization','Youth Development','Economic Mobility','Health & Human Services','Basic Needs & Critical Support','Workforce Development','Science & Technology','Research & Innovation','Environmental Protection','Civic Engagement'];
    var segLabel = REG_SEGMENT === 'advisor' ? 'Advisor' : (REG_SEGMENT === 'community' ? 'Community Member' : '');
    var subLabel = SUBTYPE_LABELS[REG_SUBTYPE] || '';
    var context = segLabel ? '<span class="ipin ipin-setup" style="margin-bottom:16px;">' + segLabel + (subLabel ? ' \u00b7 ' + subLabel : '') + '</span><br/>' : '';
    return '<div class="pop-pad">' + context + '<p class="lede">One quick step and we\u2019ll start tailoring things to you \u2014 relevant updates, the right funds, the right people.</p>'
      + '<div class="j-two" style="margin-top:16px;">' + regField('tuName','Your name','Jamie Sullivan') + regField('tuEmail','Email','jamie@cleveland.com','email') + '</div>'
      + '<div style="margin-top:20px;"><label style="display:block;font-family:var(--f-ledger);font-size:10px;font-weight:600;color:var(--forest);margin-bottom:9px;text-transform:uppercase;letter-spacing:.12em;">Interest areas \u00b7 pick as many as you like</label>'
      + '<div class="chip-row" id="tuInterests">' + interestItems.map(function(x){ return '<button class="chip" onclick="this.classList.toggle(\'sel\')">' + x + '</button>'; }).join('') + '</div></div>'
      + '<button class="btn btn-accent btn-block btn-lg" style="margin-top:20px;" onclick="submitTellUs()">Continue</button></div>';
  }},
  granteeholding:{k:'Grantee Partners',t:'Grantee Portal',h:function(){
    return '<div class="pop-pad"><div class="story-hero" style="background:linear-gradient(160deg,#1B5039,var(--forest) 55%,var(--pine));display:flex;align-items:center;justify-content:center;"><div style="text-align:center;position:relative;z-index:2;padding:0 20px;"><div style="width:72px;height:72px;border-radius:18px;border:1px dashed rgba(255,255,255,.42);display:flex;align-items:center;justify-content:center;color:#fff;margin:0 auto 16px;"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 21V5l8-3 8 3v16"/><path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 17h6v4H9z"/></svg></div><h3 style="color:#fff;margin-bottom:6px;">Grantee Portal</h3><div class="ledger" style="color:#8FB4A2;font-size:10px;letter-spacing:.2em;text-transform:uppercase;">Coming soon</div></div></div><p class="lede" style="margin-top:16px;">A dedicated home for applications, reporting, and funder communication is on its way. In the meantime, our program team is happy to help directly.</p><div style="display:flex;gap:10px;margin-top:6px;flex-wrap:wrap;"><button class="btn btn-accent btn-lg" style="flex:1;" onclick="closePopup();showToast(\'A member of our program team will follow up by email.\')">Notify our team</button><button class="btn btn-quiet btn-lg" style="flex:1;" onclick="closePopup()">Back to the site</button></div></div>';
  }},
  howitworks:{k:'The model \u00b7 Since 1914',t:'What is a community foundation?',h:function(){
    return '<div class="pop-pad"><p class="lede">In 1914, Cleveland invented a new kind of charity: instead of one donor funding one cause until the money ran out, a whole city pools its gifts into a single endowment \u2014 invested forever, granting every single year, steered by the community itself. It was the world\u2019s first community foundation. Six decades of Clevelanders later, it\u2019s still working.</p></div>'
      + '<div class="pop-grid">'
      + '<div class="pop-cell" style="cursor:default;"><div class="pc-kick">Step 01</div><div class="pc-title">You give</div><div class="pc-sub">$25 once, $25 monthly, or a named fund from $10,000. Every gift joins the same engine.</div></div>'
      + '<div class="pop-cell" style="cursor:default;"><div class="pc-kick">Step 02</div><div class="pc-title">It\u2019s invested, together</div><div class="pc-sub">Pooled into a community endowment \u2014 $3.9 billion granted since 1914 and still growing.</div></div>'
      + '<div class="pop-cell" style="cursor:default;"><div class="pc-kick">Step 03</div><div class="pc-title">Cleveland gets grants</div><div class="pc-sub">Around 5% pays out to nonprofits every year, forever. The principal keeps working.</div></div>'
      + '</div>'
      + '<div class="pop-pad"><h4>See the math yourself</h4><p>The calculator runs the real arithmetic \u2014 watch a single gift compound into decades of meals, shelter nights, and learning hours.</p>'
      + '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px;">'
      + '<button class="btn btn-primary" onclick="openPopup(\'calculator\',true)">Run the calculator</button>'
      + '<button class="btn btn-accent" onclick="openPopup(\'register\',true)">Join the Community</button>'
      + '</div></div>';
  }},
  circles:{k:'Fundholders \u00b7 More ways to work',t:'Giving circles & co-investment',h:function(){
    var CIRCLES = [
      ['Lakefront & Water Circle','Water research, shoreline access, the blue economy','24 fundholders \u00b7 from $1,000/yr'],
      ['Black Futures Circle','Black-led organizations and generational wealth','31 fundholders \u00b7 from $1,000/yr'],
      ['Arts Forward Circle','Working artists, venues, and cultural legacy','18 fundholders \u00b7 from $500/yr']
    ];
    return '<div class="pop-pad"><p class="lede">Pool your fund\u2019s granting power with fundholders who care about the same thing \u2014 shared diligence, bigger checks, one report back.</p></div>'
      + '<div class="pop-grid">' + CIRCLES.map(function(c){
          return '<div class="pop-cell" style="min-height:150px;cursor:default;"><div class="pc-kick">Giving circle</div><div class="pc-title" style="font-size:16px;">' + c[0] + '</div><div class="pc-sub">' + c[1] + '</div>'
            + '<div class="pc-sub" style="font-family:var(--f-ledger);font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3);">' + c[2] + '</div>'
            + '<button class="btn btn-quiet btn-sm" style="margin-top:8px;" onclick="circleJoin(\'' + c[0] + '\')">Join the next round</button></div>';
        }).join('') + '</div>'
      + '<div class="pop-pad"><h4>Co-investment pools</h4><p>Larger, slower, alongside the foundation\u2019s own program-related investments \u2014 currently the Site Readiness for Good Jobs pool and the Lakefront pool. Minimums from $25,000; annual liquidity windows.</p>'
      + '<div style="display:flex;gap:10px;flex-wrap:wrap;"><button class="btn btn-primary" onclick="closePopup();showToast(\'A philanthropy advisor will call about co-investment within one business day.\')">Express interest</button>'
      + '<button class="btn btn-quiet" onclick="enterPortal()">Open the portal</button></div></div>';
  }},
  fund:{k:'Fund Finder',t:'Fund',h:function(){return '';}},
  story:{k:'The campaign',t:'Story',h:function(){return '';}}
};
Object.keys(ORG_WINDOWS).forEach(function(k){
  POPUPS[k] = { k:ORG_WINDOWS[k].k, t:ORG_WINDOWS[k].t, h:(function(kk){ return function(){ return ORG_WINDOWS[kk].h; }; })(k) };
});

function renderPopup(id){
  var d = POPUPS[id];
  if (!d) return;
  document.getElementById('popKick').textContent = d.k;
  document.getElementById('popTitle').textContent = d.t;
  document.getElementById('popBody').innerHTML = d.h();
  document.getElementById('popBody').scrollTop = 0;
  document.getElementById('popBack').classList.toggle('show', popStack.length > 1);
  if (id === 'calculator') runCalc();
  if (id === 'fundfinder') renderFF();
  if (id === 'map') buildMiniMap();
}
function openPopup(id, push){
  hideGreeter(false);
  var scrim = document.getElementById('popScrim');
  if (!scrim.classList.contains('open')){ popStack = []; }
  if (push && popStack.length){ popStack.push(id); }
  else { popStack = [id]; }
  renderPopup(id);
  scrim.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function popBack(){
  if (popStack.length > 1){
    popStack.pop();
    renderPopup(popStack[popStack.length - 1]);
  }
}
function closePopup(){
  GIVE_TARGET = null;
  document.getElementById('popScrim').classList.remove('open');
  document.body.style.overflow = '';
  popStack = [];
}
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape'){
    if (document.getElementById('popScrim').classList.contains('open')) closePopup();
    else document.getElementById('msheet').classList.remove('open');
  }
});

/* stories (campaign carousel → story window) */
var STORIES = [
  { tag:'Connect People to Prosperity', color:'var(--p-pros)', grad:'linear-gradient(135deg,var(--ember),var(--p-well))', title:'A summer job became a career on Euclid Avenue', body:'A workforce pipeline grant turned a ten-week placement into a full apprenticeship — and the apprenticeship into a job with a wage that supports a family. The employer stayed in MidTown; so did she.' },
  { tag:'Invest in Vibrant Neighborhoods', color:'var(--p-neigh)', grad:'linear-gradient(135deg,var(--moss),var(--forest))', title:'Hough\'s newest homeowners built more than houses', body:'Land-trust financing kept prices in reach for long-time residents, so new construction meant new equity for the block — not displacement from it.' },
  { tag:'Grow Our Region', color:'var(--p-region)', grad:'linear-gradient(135deg,var(--p-region),var(--aqua))', title:'Fresh water, new jobs: the lakefront tech corridor', body:'Water-research grants seeded a cluster of startups on the lakefront, betting that Cleveland\'s greatest natural asset is also its next economic one.' },
  { tag:'Generations', color:'var(--magenta-lt)', grad:'linear-gradient(135deg,var(--magenta),#6B0A4C)', title:'112 years of neighbors saying yes', body:'The first community foundation on earth was a Cleveland idea: pool the gifts, invest them forever, and let each generation direct the earnings to its own moment. It worked. It\'s still working.' }
];
function openStory(i){
  var s = STORIES[i];
  POPUPS.story.t = s.title;
  POPUPS.story.h = function(){
    return '<div class="pop-pad"><div class="story-hero" style="background:'+s.grad+';"><div class="mslot" aria-hidden="true"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3.5\" width=\"18\" height=\"17\" rx=\"2.5\"/><circle cx=\"8.6\" cy=\"9.2\" r=\"1.6\"/><path d=\"M20.4 15.6l-4.7-4.6L5 20.2\"/></svg><span class="ms-cap">Story photography</span></div><span class="sh-tag">'+s.tag+'</span></div>'
      +'<p class="lede">'+s.body+'</p>'
      +'<div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap;"><button class="btn btn-primary" onclick="openPopup(\'give\',true)">Fund stories like this</button><button class="btn btn-quiet" onclick="openPopup(\'givingforward\',true)">Why we give forward</button></div></div>';
  };
  openPopup('story');
}

/* give */
function pickAmt(btn, amt){
  btn.parentElement.querySelectorAll('button').forEach(function(b){ b.classList.remove('sel'); });
  btn.classList.add('sel');
  var input = document.getElementById('giveAmount');
  if (amt > 0){ input.value = '$' + amt.toLocaleString(); }
  else { input.value = ''; input.focus(); }
}
function submitGift(){
  var amt = document.getElementById('giveAmount').value || '$250';
  var target = document.getElementById('giveTarget').value.split(' —')[0];
  closePopup();
  showToast('Gift of ' + amt + ' to ' + target + ' — thank you for giving forward.');
}
function subscribeNl(){
  var em = document.getElementById('nlEmail').value.trim();
  if (!em){ showToast('Add an email address to subscribe.'); return; }
  closePopup();
  showToast('Subscribed. First newsletter arrives this week.');
}

/* calculator — v6 unit economics */
function runCalc(){
  var amt = parseInt(document.getElementById('calcAmt').value, 10);
  var yrs = parseInt(document.getElementById('calcYrs').value, 10);
  document.getElementById('calcAmtLabel').textContent = '$' + amt.toLocaleString();
  document.getElementById('calcYrsLabel').textContent = yrs + ' years';
  var bal = amt, granted = 0;
  for (var i = 0; i < yrs; i++){ var growth = bal * 0.06; var payout = bal * 0.045; granted += payout; bal = bal + growth - payout; }
  document.getElementById('calcTotal').textContent = '$' + Math.round(granted).toLocaleString();
  document.getElementById('calcNote').textContent = 'While the fund itself grows to $' + Math.round(bal).toLocaleString();
  document.getElementById('uMeals').textContent = Math.round(granted / 0.50).toLocaleString();
  document.getElementById('uNights').textContent = Math.round(granted / 28).toLocaleString();
  document.getElementById('uHours').textContent = Math.round(granted / 12).toLocaleString();
}

/* fund finder */
var FUNDS = [
  { n:'Black Philanthropy Fund', t:'affinity', m:'Affinity · Inaugural grantees announced Aug 2026' , about:"Launched 2026 and already granting: its inaugural round backs Black-led organizations building power and permanence across Cleveland." },
  { n:'Lake Geauga Fund', t:'community', m:'Community · Serving Lake & Geauga counties' , about:"A community fund for Lake and Geauga counties \u2014 local dollars, local advisors, granted where the givers live." },
  { n:'Site Readiness for Good Jobs Fund', t:'community', m:'Community · Brownfield cleanup & industrial revitalization' , about:"Turns brownfields into job sites \u2014 cleanup and prep that makes Cleveland a place business can say yes to." },
  { n:'Cleveland Black Futures Fund', t:'affinity', m:'Affinity · Strengthening Black-led organizations' , about:"Deep, patient support for Black-led and Black-serving organizations \u2014 leadership, operations, and staying power." },
  { n:'African American Philanthropy Committee Fund', t:'affinity', m:'Affinity · Since 1993' },
  { n:'Latino Community Fund', t:'affinity', m:'Affinity · La comunidad, adelante' },
  { n:'LGBTQ+ Community Fund', t:'affinity', m:'Affinity · Equality in every neighborhood' },
  { n:'Sullivan Family Fund', t:'daf', m:'Donor advised · Est. 2026' , about:"A donor advised fund opened this year through the Giving Portal \u2014 proof the ten-minute promise holds." },
  { n:'Anisfield-Wolf Memorial Fund', t:'community', m:'Community · Books that confront racism, since 1935' },
  { n:'Greater Cleveland Food Bank Agency Fund', t:'org', m:'Organizational · Partner endowment' },
  { n:'Cleveland Public Theatre Organizational Fund', t:'org', m:'Organizational · Partner endowment' },
  { n:'Public Service Fellowship Fund', t:'community', m:'Community · Ten years of public leaders' },
  { n:'MidTown Collaboration Fund', t:'community', m:'Community · The Euclid Ave campus' },
  { n:'Rainey Institute Organizational Fund', t:'org', m:'Organizational · Arts education, Hough' }
];
var ffType = 'all';
function ffFilter(btn){
  ffType = btn.dataset.ff;
  document.querySelectorAll('#ffChips .chip').forEach(function(c){ c.classList.remove('sel'); });
  btn.classList.add('sel');
  renderFF();
}
function renderFF(){
  var q = (document.getElementById('ffSearch') ? document.getElementById('ffSearch').value : '').toLowerCase().trim();
  var out = FUNDS.filter(function(f){
    return (ffType === 'all' || f.t === ffType) && (!q || f.n.toLowerCase().indexOf(q) > -1 || f.m.toLowerCase().indexOf(q) > -1);
  }).map(function(f){
    var col = f.t === 'affinity' ? 'var(--magenta-lt)' : f.t === 'daf' ? 'var(--ember)' : f.t === 'org' ? 'var(--p-org)' : 'var(--p-region)';
    var gi = FUNDS.indexOf(f);
    return '<div class="ff-row"><button class="ffr-open" onclick="openFund(' + gi + ')"><span class="ffr-spine" style="background:' + col + ';"></span><div><div class="ffr-name">' + f.n + '</div><div class="ffr-meta">' + f.m + ' · Open →</div></div></button><button class="btn btn-quiet btn-sm ffr-give" onclick="giveToFund(\'' + f.n.replace(/'/g, "\\'") + '\')">Give</button></div>';
  }).join('');
  document.getElementById('ffResults').innerHTML = out || '<p style="color:var(--ink-3);font-size:13.5px;padding:14px 2px;">No funds match — try a shorter search, or open one of your own in the Giving Portal.</p>';
}
function ffGive(name){
  closePopup();
  showToast('Gift directed to the ' + name + '. Thank you for giving forward.');
}

/* mini map pins */
function buildMiniMap(){
  var m = document.getElementById('miniMap');
  if (!m) return;
  var cols = ['var(--p-well)','var(--p-pros)','var(--p-neigh)','var(--p-region)','var(--p-new)','var(--p-org)'];
  var html = '<svg viewBox="0 0 800 450" style="position:absolute;inset:0;width:100%;height:100%;" aria-hidden="true"><path d="M0,95 C140,70 260,110 400,88 C560,62 680,96 800,78 L800,0 L0,0 Z" fill="#123D29" opacity=".85"/><path d="M0,95 C140,70 260,110 400,88 C560,62 680,96 800,78" fill="none" stroke="#19B9A9" stroke-width="1.5" opacity=".8"/></svg>';
  for (var i = 0; i < 26; i++){
    var x = 8 + Math.random() * 84;
    var y = 32 + Math.random() * 58;
    var c = cols[i % cols.length];
    html += '<span class="pin" style="left:' + x.toFixed(1) + '%;top:' + y.toFixed(1) + '%;background:' + c + ';color:' + c + ';--pd:' + (Math.random() * 2).toFixed(2) + 's;"></span>';
  }
  m.innerHTML = html;
}

/* ============ TICKER + NEWS ============ */
var TICKER_GRANTS = [
  ['$50,000','Greater Cleveland Food Bank'],['$25,000','Rainey Institute'],['$100,000','College Now Greater Cleveland'],['$75,000','Greater Cleveland Habitat for Humanity'],['$40,000','Cleveland Public Theatre'],['$25,000','Seeds of Literacy'],['$60,000','MAGNET — Manufacturing Talent Pipeline'],['$35,000','Cleveland Water Alliance'],['$45,000','Youth Opportunities Unlimited'],['$30,000','Providence House'],['$20,000','Julia de Burgos Cultural Arts Center'],['$55,000','CHN Housing Partners']
];
function buildTicker(){
  var track = document.getElementById('tkTrack');
  var seq = TICKER_GRANTS.map(function(g){
    return '<span class="tk-item"><span class="amt">' + g[0] + '</span><span class="sep">→</span><span class="org">' + g[1] + '</span><span class="sep">·</span></span>';
  }).join('');
  track.innerHTML = seq + seq;
  if (REDUCE) track.style.animation = 'none';
}
var NEWS = [
  { d:'Aug 06', c:'var(--magenta-lt)', t:'Black Philanthropy Fund announces its inaugural round of grantees', tag:'Announcement' },
  { d:'Jul 21', c:'var(--p-region)', t:'Celebrating ten years of the Public Service Fellowship', tag:'Leadership' },
  { d:'Jul 16', c:'var(--p-new)', t:'Anisfield-Wolf Book Awards: 2026 winners celebrated Sept 18–19', tag:'Awards' },
  { d:'Jul 02', c:'var(--p-org)', t:'A vibrant Northeast Ohio where no Clevelander is left behind', tag:'Vision' },
  { d:'Jun 09', c:'var(--p-pros)', t:'New investments expand the Site Readiness for Good Jobs Fund', tag:'Region' },
  { d:'May 26', c:'var(--p-region)', t:'Introducing the Lake Geauga Fund at the Cleveland Foundation', tag:'Funds' },
  { d:'May 22', c:'var(--p-well)', t:'The Cleveland Foundation is partnering with the Guardians', tag:'Partnership' },
  { d:'Apr 10', c:'var(--ember)', t:'MidTown Collaboration Center named for Warren E. Anderson', tag:'Headquarters' }
];
function buildNews(){
  var track = document.getElementById('newsTrack');
  var seq = NEWS.map(function(n){
    return '<button class="n-card" onclick="openPopup(\'connected\')"><div class="n-thumb" style="background:linear-gradient(150deg,' + n.c + '22,var(--well));"><div class="mslot on-light tight" aria-hidden="true"><svg width=\"17\" height=\"17\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3.5\" width=\"18\" height=\"17\" rx=\"2.5\"/><circle cx=\"8.6\" cy=\"9.2\" r=\"1.6\"/><path d=\"M20.4 15.6l-4.7-4.6L5 20.2\"/></svg><span class="ms-cap">Image</span></div></div><div class="n-date"><span class="dot" style="background:' + n.c + ';"></span>' + n.d + ' · 2026</div><div class="n-title">' + n.t + '</div><div class="n-tag">' + n.tag + ' →</div></button>';
  }).join('');
  track.innerHTML = seq + seq;
  if (REDUCE) track.style.animation = 'none';
}

/* ============ MOTION ENGINE ============ */
function initReveals(){
  var targets = document.querySelectorAll('.pgrid .panel, .sect-rail, .ambition > *, .film, .c-cell');
  targets.forEach(function(el){
    if (REDUCE) return;
    el.classList.add('reveal');
    var idx = 0, p = el.parentElement;
    if (p) idx = Array.prototype.indexOf.call(p.children, el);
    el.style.setProperty('--d', ((idx % 4) * 0.07) + 's');
  });
  if (REDUCE){
    document.querySelectorAll('.cu').forEach(runCount);
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting){
        en.target.classList.add('inview');
        if (en.target.querySelectorAll) en.target.querySelectorAll('.cu').forEach(runCount);
        if (en.target.classList.contains('cu')) runCount(en.target);
        io.unobserve(en.target);
      }
    });
  }, { threshold:.12 });
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  document.querySelectorAll('.cu').forEach(function(el){ io.observe(el); });
}
function runCount(el){
  var target = parseFloat(el.dataset.cu);
  if (isNaN(target)) return;
  var pre = el.dataset.cuPre || '', suf = el.dataset.cuSuf || '';
  var dec = parseInt(el.dataset.cuDec || '0', 10);
  var grp = el.dataset.cuGrp === '1';
  function fmt(v){
    var s = grp ? Math.round(v).toLocaleString('en-US') : (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US'));
    return pre + s + suf;
  }
  if (REDUCE){ el.textContent = fmt(target); return; }
  if (el._counting) return;
  el._counting = true;
  var dur = 900, t0 = null;
  requestAnimationFrame(function tick(ts){
    if (!t0) t0 = ts;
    var p = Math.min((ts - t0) / dur, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(target * eased);
    if (p < 1) requestAnimationFrame(tick);
    else el._counting = false;
  });
}
function initParallax(){
  if (REDUCE || !window.matchMedia('(hover:hover) and (min-width:960px)').matches) return;
  var hero = document.querySelector('.hero');
  var g = hero.querySelector('.guilloche');
  var raf = null, tx = 0, ty = 0;
  hero.addEventListener('mousemove', function(e){
    var r = hero.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width - .5) * -18;
    ty = ((e.clientY - r.top) / r.height - .5) * -14;
    if (!raf) raf = requestAnimationFrame(apply);
  });
  hero.addEventListener('mouseleave', function(){ tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(apply); });
  function apply(){
    g.classList.add('tracking');
    g.style.transform = 'translate3d(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px,0) scale(1.03)';
    raf = null;
  }
}


/* ============================================================
   DONOR JOURNEY — pipeline router
   Three questions map an arrival onto one of four public tracks.
   Tracks mirror the 2026 segmentation study's funnel stages
   (CONVERT / ENGAGE / AWARENESS) without ever showing a visitor
   an internal segment label.
   ============================================================ */
var JOURNEY = { step:0, a:{}, track:null };

var TRACKS = {
  fund: {
    seg:'TCF Core', stage:'Convert',
    label:'Start a fund',
    grad:'linear-gradient(150deg,#1B5039,var(--forest) 55%,var(--pine))',
    head:"You already give. Let's make it permanent.",
    blurb:"A named fund turns this year's generosity into a grant that keeps going \u2014 invested alongside the community endowment, granted in your name, for as long as Cleveland needs it.",
    interests:['Community grantmaking','Regional economy','Legacy giving'],
    moves:[
      { k:'Primary', t:'Open a fund', s:'From $10,000. Five steps, about ten minutes.', go:'enterPortal()' },
      { k:'Guided', t:'Talk to an advisor', s:'A philanthropy advisor calls within one business day.', go:'jAdvisor()' },
      { k:'Context', t:'See where the need is', s:'Every 2025 grant, pinned across six counties.', go:"openPopup('map',true)" }
    ]
  },
  local: {
    seg:'Clevelanders First', stage:'Engage',
    label:'Give where you live',
    grad:'linear-gradient(150deg,#1A8DA9,#0E6A81 60%,#0B2E1F)',
    head:'Your block, your causes, your proof.',
    blurb:"You already give locally \u2014 more than most. The foundation's job is to make that easier and show you exactly what it moved, down to the neighborhood.",
    interests:['My neighborhood','Housing & displacement','Youth & education'],
    moves:[
      { k:'Primary', t:'Find your fund', s:'1,600+ named funds. Search by cause or neighborhood.', go:"openPopup('fundfinder',true)" },
      { k:'Low friction', t:'Give monthly from $25', s:'Small and steady beats one-time, every time.', go:"openPopup('give',true)" },
      { k:'Proof', t:'See what your area got', s:'Grants mapped street by street.', go:"openPopup('map',true)" }
    ]
  },
  discover: {
    seg:'Misinformed Locals', stage:'Awareness',
    label:'See what is actually happening',
    grad:'linear-gradient(150deg,#C0629A,#8A3E6E 60%,#0B2E1F)',
    head:'Start with the facts. Give when you are ready.',
    blurb:'No ask yet. Here is what $90 million a year actually did across Greater Cleveland last year \u2014 the map, the grantees, the numbers. Decide afterward.',
    interests:['Community news','What my gift does','Events near me'],
    moves:[
      { k:'Primary', t:'Open the impact map', s:'200+ grants, six counties, one screen.', go:"openPopup('map',true)" },
      { k:'Stay close', t:'Get the monthly brief', s:'One email. What changed, where, and why.', go:'jNews()' },
      { k:'When ready', t:'Try a first gift \u2014 $25', s:'No account, no commitment.', go:"openPopup('give',true)" }
    ]
  },
  inspire: {
    seg:'Self-Prioritizing Optimists', stage:'Awareness',
    label:'Back what you care about',
    grad:'linear-gradient(150deg,var(--ember),#B84A16 58%,#0B2E1F)',
    head:'Pick the thing you care about. We will show you the return.',
    blurb:"You are optimistic about this city \u2014 you just want your giving to go where you point it. Choose a cause, see the compounding, and keep the receipts.",
    interests:['Arts & culture','Environment & lakefront','Innovation & new ideas'],
    moves:[
      { k:'Primary', t:'Browse funds by cause', s:'Give straight to the work that fits you.', go:"openPopup('fundfinder',true)" },
      { k:'See it', t:'Watch the campaign film', s:"Ninety seconds on why any of this works.", go:"openPopup('video',true)" },
      { k:'Compound it', t:'Run the impact calculator', s:'Watch one gift turn into decades of grants.', go:"openPopup('calculator',true)" }
    ]
  },
  steward: {
    seg:'Existing fundholder', stage:'Steward',
    label:'Your fund, more ways to work',
    grad:'linear-gradient(150deg,var(--moss),#055936 58%,#0B2E1F)',
    head:'Welcome back. Here is what your fund can do next.',
    blurb:'Balances and grant history live in the portal. Beyond the basics: co-invest with other fundholders, back a matching pool, or move dollars to where this year\u2019s need actually is.',
    interests:['Grant recommendations','Co-investment','Succession & legacy'],
    moves:[
      { k:'Primary', t:'Open the Giving Portal', s:'Balances, grants, statements, impact.', go:'enterPortal()' },
      { k:'More impact', t:'Join a giving circle', s:'Pool with fundholders backing the same cause.', go:"openPopup('circles',true)" },
      { k:'Advisory', t:'Review with an advisor', s:'An annual look at strategy and payout.', go:'jAdvisor()' }
    ]
  },
  pro: {
    seg:'Professional', stage:'Partner',
    label:'Advisors and nonprofits',
    grad:'linear-gradient(150deg,#3C540C,#243305 58%,#0B2E1F)',
    head:'The side door for people who work with us.',
    blurb:'Advisors: bring your clients charitable vehicles without leaving your practice. Nonprofits: grant opportunities, agency endowments, and the application calendar.',
    interests:['Advisor resources','Grant opportunities','Agency endowments'],
    moves:[
      { k:'Advisors', t:'Advisor resources', s:'Vehicles, tax treatment, co-planning.', go:'jPro()' },
      { k:'Nonprofits', t:'Grant opportunities', s:'Open calls and the application calendar.', go:'jPro()' },
      { k:'Either', t:'Contact the team', s:'216.861.3810 \u00b7 hello@clevefdn.org', go:"openPopup('org-contact',true)" }
    ]
  }
};

var J_STEPS = [
  { k:'Question 1 of 3', q:'What brings you here today?', s:'No wrong answer \u2014 this just points you at the right door.',
    key:'intent', opts:[
      { v:'give',  t:'I want to give to something', s:'You know roughly what you care about.' },
      { v:'learn', t:'I want to understand this place', s:'What the foundation does, and whether it works.' },
      { v:'fund',  t:'I already have a fund here', s:'Take me to my balances and grants.' },
      { v:'pro',   t:'I advise clients or run a nonprofit', s:'Professional resources and partnerships.' }
    ]},
  { k:'Question 2 of 3', q:'When you give, who are you giving for?', s:'The honest answer is the useful one.',
    key:'motive', opts:[
      { v:'region', t:'The whole region rising', s:'Cleveland and Northeast Ohio, broadly.' },
      { v:'mine',   t:'My community and the causes close to me', s:'My neighborhood, my people, my issues.' },
      { v:'unsure', t:"I haven't thought about it that way", s:'Show me what the options even are.' }
    ]},
  { k:'Question 3 of 3', q:'How do you feel about the next ten years here?', s:'This shapes what we show you first.',
    key:'outlook', opts:[
      { v:'up',   t:'Optimistic \u2014 this city is going somewhere', s:'Show me what to get behind.' },
      { v:'down', t:'Concerned \u2014 there is a lot to fix', s:'Show me the problems being worked on.' },
      { v:'mixed',t:'Both, honestly', s:'Give me the real picture.' }
    ]}
];

function routeTrack(a){
  if (a.intent === 'fund') return 'steward';
  if (a.intent === 'pro')  return 'pro';
  if (a.motive === 'region') return (a.outlook === 'down') ? 'local' : 'fund';
  if (a.motive === 'mine')   return (a.outlook === 'up')   ? 'inspire' : 'discover';
  return (a.outlook === 'up') ? 'inspire' : 'discover';
}

function openJourney(){ JOURNEY = { step:0, a:{}, track:null }; openPopup('journey'); }
function jSeed(tr){ JOURNEY = { step:3, a:{ seeded:true }, track:tr }; openPopup('journey'); }
function jPick(key, val){
  JOURNEY.a[key] = val;
  if (key === 'intent' && (val === 'fund' || val === 'pro')){
    JOURNEY.track = routeTrack(JOURNEY.a); JOURNEY.step = 3;
  } else if (JOURNEY.step >= 2){
    JOURNEY.track = routeTrack(JOURNEY.a); JOURNEY.step = 3;
  } else {
    JOURNEY.step++;
  }
  jRender();
}
function jBack(){ if (JOURNEY.step > 0){ JOURNEY.step--; JOURNEY.track = null; jRender(); } }
function jRender(){
  var b = document.getElementById('popBody');
  if (b){ b.innerHTML = journeyHTML(); b.scrollTop = 0; }
}
function jAdvisor(){ closePopup(); showToast('A philanthropy advisor will reach out within one business day.'); }
function jNews(){ closePopup(); showToast('You are on the monthly brief. First issue arrives this week.'); }
function jCircle(){ closePopup(); showToast('Giving circles open quarterly \u2014 we will send you the next round.'); }
function jPro(){ closePopup(); showToast('Resources are on the way to your inbox.'); }

function journeyHTML(){
  var st = JOURNEY.step;
  if (st < 3){
    var s = J_STEPS[st];
    var comm = JOURNEY.a.intent === 'community';
    var total = comm ? 2 : 3, shown = comm ? st : st + 1;
    var dots = '';
    for (var i = (comm ? 1 : 0); i < 3; i++){
      dots += '<span class="j-dot' + (i < st ? ' done' : (i === st ? ' on' : '')) + '"></span>';
    }
    return '<div class="pop-pad">'
      + '<div class="j-rail"><span class="j-stepk">Question ' + shown + ' of ' + total + '</span>' + dots + '</div>'
      + '<div class="j-q">' + s.q + '</div><div class="j-sub">' + s.s + '</div>'
      + '<div class="j-opts">'
      + s.opts.map(function(o){
          return '<button class="j-opt" onclick="jPick(\'' + s.key + '\',\'' + o.v + '\')">'
            + '<span class="jo-t">' + o.t + '</span><span class="jo-s">' + o.s + '</span></button>';
        }).join('')
      + '</div><div class="j-foot">'
      + (st > 0 ? '<button class="j-link" onclick="jBack()">&larr; Back</button>' : '')
      + '<button class="j-link" onclick="openPopup(\'give\',true)">Skip \u2014 just let me give</button>'
      + '</div></div>';
  }

  var T = TRACKS[JOURNEY.track] || TRACKS.discover;
  if (st === 4){
    return '<div class="j-done"><div class="jd-mark"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>'
      + '<div class="j-q">You are in.</div>'
      + '<div class="j-sub" style="margin:10px auto 0;">We will keep it relevant and rare \u2014 built around ' + T.label.toLowerCase() + '.</div>'
      + '<div class="j-next">'
      + '<div><div class="jn-n">Now</div><div class="jn-t">A short welcome note, with the one thing worth reading first.</div></div>'
      + '<div><div class="jn-n">This week</div><div class="jn-t">Your first brief \u2014 matched to what you told us you care about.</div></div>'
      + '<div><div class="jn-n">Whenever</div><div class="jn-t">A standing invitation to talk with a philanthropy advisor.</div></div>'
      + '</div>'
      + '<div style="display:flex;gap:10px;justify-content:center;margin-top:22px;flex-wrap:wrap;">'
      + '<button class="btn btn-accent" onclick="' + T.moves[0].go.replace(/"/g, '&quot;') + '">' + T.moves[0].t + '</button>'
      + '<button class="btn btn-quiet" onclick="closePopup()">Back to the site</button>'
      + '</div></div>';
  }

  return '<div class="j-out"><div class="j-top" style="background:' + T.grad + ';">'
    + '<div class="jt-k">Your path \u00b7 ' + T.stage + '</div>'
    + '<h4>' + T.head + '</h4><p>' + T.blurb + '</p></div>'
    + '<div class="j-moves">'
    + T.moves.map(function(m){
        return '<button class="j-move" onclick="' + m.go.replace(/"/g, '&quot;') + '">'
          + '<span class="jm-k">' + m.k + '</span><span class="jm-t">' + m.t + '</span>'
          + '<span class="jm-s">' + m.s + '</span></button>';
      }).join('')
    + '</div>'
    + '<div class="j-reg"><div class="jr-k">Stay with it \u2014 optional, thirty seconds</div>'
    + '<div class="j-two"><div class="f-row" style="margin:0;"><label>First name</label><input type="text" id="jName" placeholder="Jamie"/></div>'
    + '<div class="f-row" style="margin:0;"><label>Email</label><input type="email" id="jEmail" placeholder="you@cleveland.com"/></div></div>'
    + '<div style="margin-top:14px;"><label style="display:block;font-family:var(--f-ledger);font-size:10px;font-weight:600;color:var(--forest);margin-bottom:9px;text-transform:uppercase;letter-spacing:.12em;">What should we send you?</label>'
    + '<div class="chip-row" id="jChips">'
    + T.interests.map(function(x, i){
        return '<button class="chip' + (i === 0 ? ' sel' : '') + '" onclick="this.classList.toggle(\'sel\')">' + x + '</button>';
      }).join('')
    + '</div></div>'
    + '<div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap;">'
    + '<button class="btn btn-accent" onclick="jRegister()">Keep me posted</button>'
    + (JOURNEY.a.seeded ? '' : '<button class="j-link" onclick="jBack()">&larr; Change my answers</button>')
    + '</div></div></div>';
}

function jRegister(){
  var em = (document.getElementById('jEmail') || {}).value;
  if (!em || em.indexOf('@') < 0){ showToast('Add an email address and we will take it from there.'); return; }
  JOURNEY.step = 4;
  GREETER.seenReturn = false;
  jRender();
}

/* internal reference \u2014 how the four tracks map to the segmentation study */
var SEGMENTS = [
  { n:'TCF Core', d:'Benefits region \u00d7 very optimistic', c:'#8CBF3F', size:'23% \u00b7 115,000', inc:'$150k', dollars:'76%', local:'78%', admire:'61%', list:'43%',
    stage:'Convert', need:'Make it inviting, give options, show the need.', track:'Ready to start a fund' },
  { n:'Clevelanders First', d:'Benefits region \u00d7 not optimistic', c:'#93BFCB', size:'22% \u00b7 110,000', inc:'$62.5k', dollars:'7%', local:'40%', admire:'51%', list:'21%',
    stage:'Engage', need:'Educate with possibility; make it easy.', track:'I give where I live' },
  { n:'Misinformed Locals', d:'Benefits self/community \u00d7 not optimistic', c:'#8E3C8E', size:'26% \u00b7 130,000', inc:'$62.5k', dollars:'10%', local:'42%', admire:'54%', list:'20%',
    stage:'Awareness', need:'Make it easy; inspire with impact.', track:'New to all this' },
  { n:'Self-Prioritizing Optimists', d:'Benefits self/community \u00d7 very optimistic', c:'#2C6B8A', size:'29% \u00b7 145,000', inc:'$87.5k', dollars:'6%', local:'40%', admire:'45%', list:'16%',
    stage:'Awareness', need:'Inspire me with impact.', track:'Back what you care about' }
];


/* ============================================================
   ARRIVAL GREETER
   One friendly card at the door. Two states, session-aware:
   - "new"    \u2014 first arrival, invites into the questionnaire
   - "return" \u2014 shown once after portal exit or with a saved
                journey path; feels native to someone who's
                already inside the ecosystem.
   Session memory only (prototype): production persists this
   via the account / a consented cookie.
   ============================================================ */
var GREETER = { seenArrive:false, seenReturn:false, dismissed:false, portalVisited:false };

function greeterCopy(mode){
  if (mode === 'return'){
    if (JOURNEY && JOURNEY.step === 4 && JOURNEY.track && TRACKS[JOURNEY.track]){
      var T = TRACKS[JOURNEY.track];
      return { kick:'Welcome back', live:true,
        title:'Pick up where you left off?',
        sub:'We saved your path for this visit \u2014 ' + T.label.toLowerCase() + '.',
        cta:'Continue', go:"jSeed('" + JOURNEY.track + "')", skip:'Keep exploring' };
    }
    return { kick:'Welcome back', live:true,
      title:"Your fund's right where you left it.",
      sub:'Head back in any time \u2014 or see what\u2019s new on the public side of the house.',
      cta:'Reopen the Giving Portal', go:'enterPortal()', skip:'Keep exploring' };
  }
  return { kick:'Welcome \u00b7 Est. 1914', live:false,
    title:'You\u2019re the reason we\u2019re here.',
    sub:'Community member, nonprofit, advisor, or fundholder \u2014 register in about thirty seconds and we\u2019ll open the door that fits you.',
    cta:'Join the Community', go:"openPopup('register')", skip:'Just browsing' };
}

function showGreeter(mode){
  var g = document.getElementById('greeter');
  if (!g || GREETER.dismissed) return;
  if (document.getElementById('popScrim').classList.contains('open')) return;
  if (document.body.classList.contains('portal-on')) return;
  var c = greeterCopy(mode);
  document.getElementById('gBody').innerHTML =
    '<div class="g-kick">' + (c.live ? '<span class="live"></span>' : '') + c.kick + '</div>'
    + '<div class="g-title">' + c.title + '</div>'
    + '<div class="g-sub">' + c.sub + '</div>'
    + '<div class="g-actions"><button class="btn btn-accent" onclick="hideGreeter(false);' + c.go + '">' + c.cta + '</button>'
    + '<button class="g-skip" onclick="hideGreeter(true)">' + c.skip + '</button></div>';
  g.classList.add('on');
}
function hideGreeter(dismissed){
  var g = document.getElementById('greeter');
  if (g) g.classList.remove('on');
  if (dismissed) GREETER.dismissed = true;
}

/* arrival moment \u2014 after the hero settles */
setTimeout(function(){
  if (!GREETER.seenArrive){
    GREETER.seenArrive = true;
    showGreeter('new');
  }
}, REDUCE ? 600 : 1500);


/* ============================================================
   EVOLUTION BUILD \u2014 registration by persona
   Identity at the door, motivation inside the door: personas
   route directly; Community Members get the two-question
   router (the segmentation study lives inside that one door).
   ============================================================ */
var GIVE_TARGET = null;

var REG_SEGMENT = null;
var REG_SUBTYPE = null;
var SUBTYPE_LABELS = {
  'resident':'Active City Resident',
  'civic-leader':'Community or Civic Leader',
  'professional-advisor':'Professional Advisor',
  'financial-advisor':'Financial Advisor',
  'estate-attorney':'Estate Attorney',
  'other':'Other'
};
function beginRegistration(segment, push){
  REG_SEGMENT = segment;
  REG_SUBTYPE = null;
  if (segment === 'community'){ openPopup('tellus', push); }
  else if (segment === 'advisor'){ openPopup('sortAdvisor', push); }
  else { openPopup('tellus', push); }
}
function pickSubtype(val){
  REG_SUBTYPE = val;
  openPopup('tellus', true);
}
function chipPick(btn){
  var row = btn.parentElement;
  for (var i = 0; i < row.children.length; i++){ row.children[i].classList.remove('sel'); }
  btn.classList.add('sel');
}

function regDone(persona, title, lines, primary){
  document.getElementById('popBody').innerHTML =
    '<div class="j-done"><div class="jd-mark"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>'
    + '<div class="j-q">' + title + '</div>'
    + '<div class="j-next">' + lines.map(function(l){
        return '<div><div class="jn-n">' + l[0] + '</div><div class="jn-t">' + l[1] + '</div></div>';
      }).join('') + '</div>'
    + '<div style="display:flex;gap:10px;justify-content:center;margin-top:22px;flex-wrap:wrap;">'
    + '<button class="btn btn-accent" onclick="' + primary[1] + '">' + primary[0] + '</button>'
    + '<button class="btn btn-quiet" onclick="closePopup()">Back to the site</button>'
    + '</div></div>';
  document.getElementById('popBody').scrollTop = 0;
}
function regField(id, label, ph, type){
  return '<div class="f-row" style="margin:0;"><label>' + label + '</label><input type="' + (type||'text') + '" id="' + id + '" placeholder="' + ph + '"/></div>';
}
function regChips(id, items){
  return '<div style="margin-top:14px;"><label style="display:block;font-family:var(--f-ledger);font-size:10px;font-weight:600;color:var(--forest);margin-bottom:9px;text-transform:uppercase;letter-spacing:.12em;">What do you need from us?</label>'
    + '<div class="chip-row" id="' + id + '">' + items.map(function(x,i){
        return '<button class="chip' + (i===0?' sel':'') + '" onclick="this.classList.toggle(\'sel\')">' + x + '</button>';
      }).join('') + '</div></div>';
}
function regNeedEmail(id){
  var em = (document.getElementById(id)||{}).value;
  if (!em || em.indexOf('@') < 0){ showToast('Add an email address and we will take it from there.'); return false; }
  return true;
}
function submitTellUs(){
  if (!regNeedEmail('tuEmail')) return;
  var align = (document.querySelector('#tuAlign .chip.sel') || {}).textContent || 'what matters most to you';
  var isAdvisor = REG_SEGMENT === 'advisor';
  regDone(REG_SEGMENT || 'community', "You're in.", [
    ['Now', isAdvisor ? 'A welcome note and the advisor toolkit, matched to what you told us.' : 'A short welcome note, with the one thing worth reading first.'],
    ['This week', 'Your first brief \u2014 built around ' + align + '.'],
    ['Whenever', 'A standing invitation to talk with a philanthropy advisor.']
  ], [isAdvisor ? 'Open advisor resources' : 'Explore the site', 'closePopup()']);
}
function giveToFund(name){
  GIVE_TARGET = name;
  openPopup('give', true);
}
function openFund(i){
  var f = FUNDS[i];
  if (!f) return;
  POPUPS.fund.t = f.n;
  POPUPS.fund.h = function(){
    return '<div class="pop-pad"><div class="story-hero" style="background:linear-gradient(150deg,' + (f.t==='affinity'?'var(--magenta),#6B0A4C':f.t==='daf'?'var(--ember),#B84A16':f.t==='org'?'var(--moss),#055936':'#1A8DA9,#0E5A70') + ');aspect-ratio:16/6;"><span class="sh-tag">' + f.m + '</span></div>'
      + '<p class="lede">' + (f.about || 'A named fund at the Cleveland Foundation \u2014 pooled with the community endowment, granted on purpose.') + '</p>'
      + '<div class="facts" style="margin-top:16px;"><div class="fr"><span class="fk">Type</span><span class="fv">' + f.m.split(' \u00b7 ')[0] + '</span></div><div class="fr"><span class="fk">Granting</span><span class="fv">Annually, alongside the endowment</span></div><div class="fr"><span class="fk">Give</span><span class="fv">Any amount \u00b7 one time or recurring</span></div></div>'
      + '<div style="display:flex;gap:10px;margin-top:18px;flex-wrap:wrap;">'
      + '<button class="btn btn-accent" onclick="giveToFund(\'' + f.n.replace(/'/g, "\\'") + '\')">Give to this fund</button>'
      + '<button class="btn btn-quiet" onclick="enterPortal()">Start one with your name on it</button>'
      + '</div></div>';
  };
  openPopup('fund', true);
}
function circleJoin(name){
  closePopup();
  showToast('You\u2019re on the list for the ' + name + ' \u2014 next round opens quarterly.');
}

/* ============ EMBEDDED PORTAL ============ */
var portalLoaded = false;
function enterPortal(){
  hideGreeter(false);
  GREETER.portalVisited = true;
  closePopup();
  document.getElementById('msheet').classList.remove('open');
  var shell = document.getElementById('portalShell');
  shell.classList.add('on');
  shell.setAttribute('aria-hidden','false');
  document.body.classList.add('portal-on');
  var veil = document.getElementById('psVeil');
  if (!portalLoaded){
    setTimeout(function(){
      var bytes = Uint8Array.from(atob(PORTAL_B64), function(c){ return c.charCodeAt(0); });
      document.getElementById('portalFrame').srcdoc = new TextDecoder('utf-8').decode(bytes);
      portalLoaded = true;
      setTimeout(function(){ veil.classList.add('gone'); }, 950);
    }, 420);
  } else {
    veil.classList.add('gone');
  }
}
function exitPortal(){
  var shell = document.getElementById('portalShell');
  shell.classList.remove('on');
  shell.setAttribute('aria-hidden','true');
  document.body.classList.remove('portal-on');
  if (!GREETER.seenReturn){
    GREETER.seenReturn = true;
    setTimeout(function(){ showGreeter('return'); }, 900);
  }
}


/* ============ EMBEDDED IMPACT MAP ============ */
var mapLoaded = false;
function enterMap(){
  closePopup();
  document.getElementById('msheet').classList.remove('open');
  var shell = document.getElementById('mapShell');
  shell.classList.add('on');
  shell.setAttribute('aria-hidden','false');
  document.body.classList.add('portal-on');
  var veil = document.getElementById('mapVeil');
  if (!mapLoaded){
    setTimeout(function(){
      var bytes = Uint8Array.from(atob(MAP_B64), function(c){ return c.charCodeAt(0); });
      document.getElementById('mapFrame').srcdoc = new TextDecoder('utf-8').decode(bytes);
      mapLoaded = true;
      setTimeout(function(){ veil.classList.add('gone'); }, 700);
    }, 300);
  } else {
    veil.classList.add('gone');
  }
}
function exitMap(){
  var shell = document.getElementById('mapShell');
  shell.classList.remove('on');
  shell.setAttribute('aria-hidden','true');
  document.body.classList.remove('portal-on');
}

/* ============ EMBEDDED IMPACT CALCULATOR ============ */
var calcLoaded = false;
function enterCalc(){
  closePopup();
  document.getElementById('msheet').classList.remove('open');
  var shell = document.getElementById('calcShell');
  shell.classList.add('on');
  shell.setAttribute('aria-hidden','false');
  document.body.classList.add('portal-on');
  var veil = document.getElementById('calcVeil');
  if (!calcLoaded){
    setTimeout(function(){
      var bytes = Uint8Array.from(atob(CALC_B64), function(c){ return c.charCodeAt(0); });
      document.getElementById('calcFrame').srcdoc = new TextDecoder('utf-8').decode(bytes);
      calcLoaded = true;
      setTimeout(function(){ veil.classList.add('gone'); }, 700);
    }, 300);
  } else {
    veil.classList.add('gone');
  }
}
function exitCalc(){
  var shell = document.getElementById('calcShell');
  shell.classList.remove('on');
  shell.setAttribute('aria-hidden','true');
  document.body.classList.remove('portal-on');
}

buildTicker();
buildNews();
initReveals();
initParallax();
