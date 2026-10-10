/* KAYGRAFIXDESIGN — data layer. Edit here; the site renders from this. */
window.KAY_CATEGORIES = [
 {
  "id": "all",
  "label": "All"
 },
 {
  "id": "church-events",
  "label": "Church Events"
 },
 {
  "id": "infographics",
  "label": "Infographics"
 },
 {
  "id": "special-events",
  "label": "Special Events"
 },
 {
  "id": "campaign",
  "label": "Campaign"
 },
 {
  "id": "certificates",
  "label": "Certificates"
 },
 {
  "id": "social-media",
  "label": "Social Media"
 },
 {
  "id": "t-shirt",
  "label": "T-Shirts"
 },
 {
  "id": "branding",
  "label": "Branding"
 },
 {
  "id": "funeral",
  "label": "Funeral"
 },
 {
  "id": "other",
  "label": "Other"
 }
];

/* Per-category copy + services (used in the selected-project panel & lightbox). Add "year" to any item to show it. */
window.KAY_CATEGORY_META = {
 "church-events":{label:"Church Events",desc:"Event graphics made to draw people in and carry the message of the programme.",services:["Flyer Design","Event Graphics","Church Graphics"]},
 "infographics":{label:"Infographics",desc:"Information organised into clear, engaging visuals that are easy to follow.",services:["Infographic Design","Layout","Typography"]},
 "special-events":{label:"Special Events",desc:"Celebrations, ceremonies and gatherings given a polished, memorable look.",services:["Event Graphics","Flyer Design","Print Design"]},
 "campaign":{label:"Campaign",desc:"Bold campaign visuals built to be seen, remembered and shared.",services:["Campaign Design","Promotional Graphics","Print Design"]},
 "certificates":{label:"Certificates",desc:"Formal certificates and citations with a refined, dignified finish.",services:["Certificate Design","Layout","Print Design"]},
 "social-media":{label:"Social Media",desc:"Scroll-stopping posts and graphics designed for engagement.",services:["Social Media Design","Digital Design","Promotional Graphics"]},
 "t-shirt":{label:"T-Shirts",desc:"Apparel artwork and mockups ready for production.",services:["T-Shirt Design","Mockups","Print Design"]},
 "branding":{label:"Branding",desc:"The KAYGRAFIX brand identity, from logo system to real-world applications.",services:["Logo Design","Brand Identity","Visual Direction"]},
 "funeral":{label:"Funeral",desc:"Respectful, dignified tributes, programmes and invitations.",services:["Funeral Programmes","Invitations","Print Design"]},
 "other":{label:"Other Work",desc:"Photo restoration, picture editing, cards, labels, CVs and more.",services:["Photo Editing","Photo Restoration","Print Design"]}
};

/* [src, category, title, width, height] */
const RAW = [
  ["images/bifold1.jpg","other","Bifold design",3507,2480],
  ["images/bifold2.jpg","other","Bifold design",3507,2480],
  ["images/bifold1.jpg","other","Bifold design",3507,2480],
  ["images/bifoldmkp1.jpg","other","Bifold mockup",5000,3750],
  ["images/CERT_4.jpg","certificates","Certificate",3508,2480],
  ["images/FLOAT_BANNER2.jpg","special-events","Grand Opening Event banner",5184,3456],
  ["images/GRADUATION_BANNER.jpg","special-events","Graduation Banner",8640,6912],
  ["images/15-DAYS.jpg","church-events","15 Days of Prayer",1080,1350],
  ["images/july.jpg","church-events","July Church Programme",1480,1480],
  ["images/holy-ghost.jpg","church-events","Holy Ghost Service",2048,2450],
  ["images/april-read.jpg","infographics","April Reading Plan",2208,2208],
  ["images/MT_new.jpg","social-media","IG Post",1000,1180],
  ["images/MARCH.jpg","infographics","March Reading Plan",1080,1350],
  ["images/trifoldmkp1.jpg","other","Trifold Mockup",4000,3000],
  ["images/trifoldmkp2.jpg","other","Trifold Mockup",4000,3000],
  ["images/trifoldmkp3.jpg","other","Trifold Mockup",4000,3000],
  ["images/NAMING.jpg","special-events","Naming Ceremony",2000,2436],
  ["images/BIBLE-FEB.jpg","special-events","Bible Study — February",1654,1969],
  ["images/GOB3.jpg","special-events","Special Event Flyer",1900,2208],
  ["images/grads.jpg","special-events","Graduation",1080,1240],
  ["images/ACTTSS.jpg","special-events","Event Banner",1440,720],
  ["images/CHAIRMAN.jpg","campaign","Chairman Campaign",2000,2436],
  ["images/campaign.jpg","campaign","Campaign Flyer",2000,2436],
  ["images/key-reforms.jpg","campaign","Key Reforms",2000,2436],
  ["images/franco_democert.jpg","certificates","Certificate of Recognition",2480,3508],
  ["images/cert-1.jpg","certificates","Certificate Design I",1700,1242],
  ["images/cert-3.jpg","certificates","Certificate Design III",1508,1066],
  ["images/mum-citation-epuc.jpg","other","Citation",1242,1800],
  ["images/gruds-oil.jpg","social-media","Product Promo",2048,2632],
  ["images/counseling.jpg","social-media","Counseling",2048,2732],
  ["images/fredkac.jpg","social-media","Fredkac",2048,2632],
  ["images/samedia3.jpg","social-media","Social Post 3",354,613],
  ["images/samedia2.jpg","social-media","Social Post 2",292,512],
  ["images/social-media-post-2.jpg","social-media","Social Media Post 2",1242,1500],
  ["images/social-media-post-1.jpg","social-media","Social Media Post 1",1242,1500],
  ["images/powerline.jpg","social-media","Powerline",1024,713],
  ["images/samedia1.jpg","social-media","Social Post 1",1024,512],
  ["images/fundsappeal.jpg","social-media","Funds Appeal",595,292],
  ["images/sa-counseling.jpg","social-media","Counseling Series",1024,1024],
  ["images/t-shirt-design-1.jpg","t-shirt","T-Shirt Design 1",1242,1500],
  ["images/t-shirt-design-2.jpg","t-shirt","T-Shirt Design 2",1242,1000],
  ["images/t-shirt-design-3.jpg","t-shirt","T-Shirt Design 3",1242,1000],
  ["images/t-shirt-design-4.jpg","t-shirt","T-Shirt Design 4",1508,1269],
  ["images/aluminumBLUEBLACKMKP.jpg","t-shirt","Aluminum Shirt — Blue/Black",1859,1177],
  ["images/aluminumyellowmockup.jpg","t-shirt","Aluminum Shirt — Yellow",1859,1177],
  ["images/fodomenew.jpg","t-shirt","Fodome Shirt",2903,2903],
  ["images/jhsshirtmissahoeblue.jpg","t-shirt","JHS Shirt — Blue",1859,1177],
  ["images/jhsshirtmissahoe.jpg","t-shirt","JHS Shirt",1859,1177],
  ["images/BAIKASHIRTMKPNEW.jpg","t-shirt","Baika Shirt Mockup",1859,1177],
  ["images/matchday.jpg","other","Matchday",1080,1340],
  ["images/cv-joshua.jpg","other","Résumé / CV",1242,1800],
  ["images/funeral_wom1.jpg","funeral","Funeral Poster — Woman",768,1024],
  ["images/funeralman.jpg","funeral","Funeral Poster — Man",768,1024],
  ["images/eliza_funeral.jpg","funeral","Funeral Poster — Eliza",768,1024],
  ["images/pozofuneral.jpg","funeral","Funeral Poster — Pozo",768,1024],
  ["images/elizabeth_funeral.jpg","funeral","Funeral Poster — Elizabeth",768,1024],
  ["images/beauty3by4.jpg","funeral","Funeral Tribute",1904,2732],
  ["images/FUNERAL-2.jpg","funeral","Funeral Poster",900,1200],
  ["images/funeral-11.jpg","funeral","Funeral Programme",2480,1169],
  ["images/FUNERALINVITATION.jpg","funeral","Funeral Invitation",2480,1169],
  ["images/funeral-receipt.jpg","funeral","Funeral Receipt",2400,900],
  ["images/jacob.jpg","other","Photo Restoration I",1904,2732],
  ["images/nii-dad.jpg","other","Photo Restoration II",1904,2732],
  ["images/picture-edit-1.jpg","other","Picture Edit I",1859,1177],
  ["images/picture-edit-2.jpg","other","Picture Edit II",1859,1177],
  ["images/comp-1.jpg","other","Complimentary Card 1",1050,600],
  ["images/comp-2.jpg","other","Complimentary Card 2",1004,650],
  ["images/comp-3.jpg","other","Complimentary Card 3",1004,709],
  ["images/label-1.jpg","other","Product Label",2480,877],
  ["1x/Artboard-1.jpg","branding","Brand Cover",1024,768],
  ["1x/Artboard-2.jpg","branding","Brand Introduction",1024,768],
  ["1x/Artboard-3.jpg","branding","Brand Story",1024,768],
  ["1x/Artboard-4.jpg","branding","Brand Concept",1024,768],
  ["1x/Artboard-5.jpg","branding","KAYGFX Primary Logo",1024,768],
  ["1x/Artboard-6.jpg","branding","KAYGRAFIX Secondary Logo",1024,768],
  ["1x/Artboard-7.jpg","branding","Logo Types",1024,768],
  ["1x/Artboard-8.jpg","branding","Colour Palette",1024,768],
  ["1x/Artboard-9.jpg","branding","Typography",1024,768],
  ["1x/Artboard-10.jpg","branding","Logo Colourways",1024,768],
  ["1x/Artboard-11.jpg","branding","Wordmark Variations",1024,768],
  ["1x/Artboard-12.jpg","branding","Monogram Variations",1024,768],
  ["1x/Artboard-13.jpg","branding","Icon Variations",1024,768],
  ["1x/Artboard-14.jpg","branding","Icon Pattern",1024,768],
  ["1x/Artboard-15.jpg","branding","Monogram Pattern",1024,768],
  ["1x/Artboard-16.jpg","branding","Laptop Mockup",1024,768],
  ["1x/Artboard-17.jpg","branding","Roll-up Banner Mockup",1024,768],
  ["1x/Artboard-18.jpg","branding","Smartwatch Mockup",1024,768],
  ["1x/Artboard-19.jpg","branding","Phone Case Mockup",1024,768],
  ["1x/Artboard-20.jpg","branding","Vehicle Branding",1024,768],
  ["1x/Artboard-21.jpg","branding","Phone Cases",1024,768],
  ["1x/Artboard-22.jpg","branding","Cup Packaging",1024,768],
  ["1x/Artboard-23.jpg","branding","Bucket Hat",1024,768],
  ["1x/Artboard-24.jpg","branding","Apparel Branding",1024,768],
  ["images/bright-pic-birth.jpg","special-events","Birthday Flyer",2480,3508],
  ["images/ansahApp.jpg","special-events","Birthday Flyer — Ansah",1125,1125],
  ["images/holy-ghost-con.jpg","church-events","Holy Ghost Convention",2048,2450],
  ["1x/Artboard-25.jpg","branding","T-Shirt Branding",1024,768]
];

window.KAY_PORTFOLIO = RAW.map(function (r, i) {
  var m = window.KAY_CATEGORY_META[r[1]];
  return { id: r[1] + "-" + String(i + 1).padStart(2, "0"), title: r[2], category: r[1], categoryLabel: m.label,
           image: r[0], w: r[3], h: r[4], description: m.desc, services: m.services };
});

/* Hero carousel: ids picked by image path so order is easy to change. Mix of brand boards + real client work. */
window.KAY_HERO_PICKS = [
  "images/Mt_new.jpg",
  "1x/Artboard-16.jpg",
  "images/15-DAYS.jpg",
  "1x/Artboard-18.jpg",
  "images/t-shirt-design-1.jpg",
  "1x/Artboard-12.jpg",
  "images/campaign.jpg",
  "1x/Artboard-20.jpg",
  "images/social-media-post-1.jpg",
  "1x/Artboard-22.jpg",
  "images/cert-1.jpg",
  "1x/Artboard-24.jpg",
  "images/april-read.jpg"
];
window.KAY_HERO = window.KAY_HERO_PICKS.map(function (p) { return window.KAY_PORTFOLIO.find(function (x) { return x.image === p; }); }).filter(Boolean);


/* ==========================================================
   BRAND FOLDERS — one block per brand. Add / edit / remove freely.
   Put each brand's images in its own folder, e.g. images/brands/brand-two/
   Missing images automatically show an "ADD IMAGE" placeholder.
   Fields: id (unique, no spaces) · name · tagline · description · services[] · year · client (optional)
           cover (thumbnail) · coverFit ("cover" or "contain", optional) · images[] = { src, title }
   ========================================================== */
window.KAY_BRANDS = [
  {
    id: "kaygrafix",
    name: "KAYGRAFIX",
    tagline: "My own brand identity",
    description: "The complete KAYGRAFIX identity: logo system, colour palette, typography, patterns and real-world mockups.",
    services: ["Logo Design", "Brand Identity", "Visual Direction"],
    year: "",
    cover: "1x/Artboard-16.jpg",
    images: window.KAY_PORTFOLIO.filter(function (x) { return x.category === "branding"; })
      .map(function (x) { return { src: x.image, title: x.title }; })
  },
  {
    id: "brand-two",
    name: "CYRD Brand Overview",
    tagline: "Brand identity for CYRD, Pentecost University",
    description: "This is a complete brand for the Centre for Youth Research and Development, Pentecost University.",
    services: ["Logo Design", "Brand Identity"],
    year: "2026",
    client: "",
    cover: "images/brands/CYRD/CYRD1.jpg",
    images: [
      { src: "images/brands/CYRD/CYRD1.jpg", title: "Primary Logo" },
      { src: "images/brands/CYRD/CYRD2.jpg", title: "Colour Palette" },
      { src: "images/brands/CYRD/CYRD4.jpg", title: "Business Card Mockup" },
      { src: "images/brands/CYRD/CYRD5.jpg", title: "Signage Mockup" },
      { src: "images/brands/CYRD/CYRD6.jpg", title: "Signage Mockup" },
      { src: "images/brands/CYRD/CYRD7.jpg", title: "Signage Mockup" },
      { src: "images/brands/CYRD/CYRD8.jpg", title: "Signage Mockup" },
      { src: "images/brands/CYRD/CYRD9.jpg", title: "Signage Mockup" },
      { src: "images/brands/CYRD/CYRD10.jpg", title: "Signage Mockup" },
      { src: "images/brands/CYRD/CYRD11.jpg", title: "Signage Mockup" },
      { src: "images/brands/CYRD/CYRD12.jpg", title: "Signage Mockup" },
      { src: "images/brands/CYRD/CYRD13.jpg", title: "Signage Mockup" },
      { src: "images/brands/CYRD/CYRD14.jpg", title: "Signage Mockup" },
      { src: "images/brands/CYRD/CYRD15.jpg", title: "Signage Mockup" },
      { src: "images/brands/CYRD/CYRD16.jpg", title: "Signage Mockup" },
      { src: "images/brands/CYRD/CYRD17.jpg", title: "Signage Mockup" },
      { src: "images/brands/CYRD/CYRD18.jpg", title: "Signage Mockup" },
      { src: "images/brands/CYRD/CYRD19.jpg", title: "Signage Mockup" }

    ]
  },
  {
    id: "brand-three",
    name: "Rhema Flame Ministry",
    tagline: "Complete brand system for the Rhema Flame Ministry, Ghana",
    description: "This is a brand for a new youth ministry on tertiary campuses. The ministry seeks to empower young people through teaching the word of God with fire.",
    services: ["Logo Design", "Brand developmnent", "Visual Direction"],
    year: "2026",
    cover: "images/brands/Rhema Flame/RArtboard 6.jpg",
    images: [
      { src: "images/brands/Rhema Flame/RArtboard 1.jpg", title: "Logo Suite" },
      { src: "images/brands/Rhema Flame/RArtboard 2.jpg", title: "Packaging Mockup" },
      { src: "images/brands/Rhema Flame/RArtboard 3.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RArtboard 4.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RArtboard 5.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RArtboard 6.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RArtboard 7.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RArtboard 8.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RArtboard 9.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RFArtboard 1.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RFArtboard 2.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RFArtboard 3.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RFArtboard 4.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RFArtboard 5.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RFArtboard 6.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RFArtboard 7.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RFArtboard 8.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RFArtboard 9.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RFArtboard 10.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RFArtboard 11.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RFArtboard 12.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RFArtboard 13.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RFArtboard 14.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RFArtboard 15.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RFArtboard 16.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RFArtboard 17.jpg", title: "Social Media Kit" },
      { src: "images/brands/Rhema Flame/RFArtboard 18.jpg", title: "Social Media Kit" },

    ]
  },
];


/* Marquee images (left → right order in the loop). Add, remove or reorder freely. */
window.KAY_MARQUEE = [
  "images/Shikeinah.jpg",
  "images/GRADUATION_BANNER.JPG",
  "images/trifoldmkp1.jpg",
  "images/trifoldmkp2.jpg",
  "images/trifoldmkp3.jpg",
  "images/Mt_new.jpg",
  "images/MT.jpg",
  "images/newdes2.jpg",
  "images/shikeinah_conference.jpg",
  "images/BECE.jpg",
  "images/bifold1.jpg",
  "images/bifold2.jpg",
  "images/bifoldmkp1.jpg",
  "images/CERT_4.jpg",
  "images/FLOAT_BANNER2.jpg",
  "images/holy-ghost-con.jpg",
  "images/holy-ghost.jpg",
  "images/sa-counseling.jpg",
  "images/picture-edit-1.jpg",
  "images/picture-edit-2.jpg",
  "images/fredkac.jpg",
  "images/gruds-oil.jpg",
  "images/BAIKASHIRTMKPNEW.JPG",
  "images/fodomenew.jpg",
  "images/fundsappeal.jpg",
  "images/samedia3.jpg",
  "images/samedia2.jpg",
  "images/samedia1.jpg",
  "images/powerline.jpg",
  "images/pozofuneral.jpg",
  "images/funeral_wom1.jpg",
  "images/funeralman.jpg",
  "images/eliza_funeral.jpg",
  "images/elizabeth_funeral.jpg",
  "images/beauty3by4.jpg",
  "images/campaign.jpg",
  "images/counseling.jpg",
  "images/GOB3.jpg",
  "images/15-DAYS.jpg",
  "images/funeral-11.jpg",
  "images/july.jpg",
  "images/label-1.jpg",
  "images/social-media-post-2.jpg",
  "images/NAMING.jpg",
  "images/social-media-post-1.jpg",
  "images/jhsshirtmissahoeblue.jpg",
  "images/jhsshirtmissahoe.jpg",
  "images/aluminumBLUEBLACKMKP.jpg",
  "images/aluminumyellowmockup.jpg",
  "images/t-shirt-design-3.jpg",
  "images/t-shirt-design-2.jpg",
  "images/t-shirt-design-1.jpg",
  "images/t-shirt-design-4.jpg",
  "images/CHAIRMAN.jpg",
  "images/comp-2.jpg",
  "images/ACTTSS.jpg",
  "images/comp-1.jpg",
  "images/comp-3.jpg",
  "images/cert-1.jpg",
  "images/grads.jpg"
];
