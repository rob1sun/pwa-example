//Sökfilter
function searchFilter() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("spList");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        p = a[i].getElementsByTagName("p")[0];
        txtValue = a.textContent || p.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

//Läs in IdP-array från json
{
		fetch('https://fedfeeds.robertsundin.se/idp/json/multiidp.json')
            .then(function (idpResponse) {
                return idpResponse.json();
            })
            .then(function (idpData) {
                appendSpData(idpData);
            })
            .catch(function (err) {
                console.log('error: ' + err);
            });
//Append json och nästla efterföljande script
        function appendSpData(idpData) {
			
            for (let y = 0; y < idpData.length; y++) {
				let idpDisplayName = idpData[y].idpDisplayName
				let idpEntityId = idpData[y].idpEntityId
				let idpImg = idpData[y].idpImg
				
//Skapa lista och infoga på sida
const dFragIdp = document.createDocumentFragment();
				
const opt = document.createElement('option');
  opt.textContent = idpDisplayName;
  opt.value = idpEntityId;
  
  dFragIdp.appendChild(opt);
  
  document.getElementById('idpSelect').appendChild(dFragIdp);
  
}}

//Sätt vald entityID som variabel
 function updateIdp() {
  let pickedIdp = document.getElementById("idpSelect").value;
  

// sätt text från selected option som variabel
const pickedIdpDisplay = (el) => {
  if (el.selectedIndex === -1) {
    return null;
  }
  return el.options[el.selectedIndex].text;
}
const select = document.querySelector('select')
const text = pickedIdpDisplay(select);


// visa vald organisation och omval
const myOrgContent=`
<div class="flex-header wrap">
<div class="flex-headeritem-org"><h1 id="show">Ingen vald organisation</h1></div>
<input  class="flex-headeritem-search" type="text" id="searchInput" onkeyup="searchFilter()" placeholder="Sök efter en tjänst.." title="Skriv namn på tjänst">
<div class="flex-headeritem-org"><button class="button" onclick="reload()">Byt inloggning</button></div>
</div>
`;

document.getElementById("myOrg").innerHTML = myOrgContent;

// infoga text för vald option i dokumentet
document.getElementById("show").innerHTML = text;
  
 	
		//Läs in SP-array från json
		fetch('https://fedfeeds.robertsundin.se/sp/json/splink.json')
            .then(function (spResponse) {
                return spResponse.json();
            })
            .then(function (spData) {
                appendSpData(spData);
            })
            .catch(function (err) {
                console.log('error: ' + err);
            });
//Append json och nästla efterföljande script
        function appendSpData(spData) {
			
            for (let x = 0; x < spData.length; x++) {
				let concLink = spData[x].spLink + pickedIdp + spData[x].spTarget;
				let spDisplayName = spData[x].spDisplayName
				let spImg = spData[x].spImg
				let spShortDescription = spData[x].shortDescription
				let spDescription = spData[x].description
				
//Skapa lista och infoga på sida
const dFrag = document.createDocumentFragment();

  const a = document.createElement('a');
  a.className = "flex-item";
  a.setAttribute('href', concLink);
  a.target = "_blank";
  const img = document.createElement('img');
  img.className = "flex-item-img";
  img.setAttribute('src', spImg);
  const p = document.createElement('p');
  p.className = "flex-item-txt";
  p.innerHTML = spDisplayName;
  const pOrg = document.createElement('p');
  pOrg.className = "flex-item-org";
  pOrg.innerHTML = spShortDescription;
  const pDescription = document.createElement('p');
  pDescription.innerHTML = spDescription;
  pDescription.className = "flex-item-description";
  
  dFrag.appendChild(a);
  a.appendChild(img);
  a.appendChild(p);
  a.appendChild(pOrg);
  a.appendChild(pDescription);
  
  document.getElementById('spList').appendChild(dFrag);
  
  
 // Dölj val av orgaisation efter att valet är gjort
  document.getElementById("idpSelectDiv").style.display = "none";
  
		}}}}

//Visa alert box och ladda därefter om dokumentet vid "välj en annan organisation"
function reload() {
  alert("Du kommer nu att kunna göra om ditt val av organisation, men tänk på att om du redan har loggat in i en tjänst så kommer tjänsten att komma ihåg den inloggningen. Du kan därför behöva stänga webbläsaren och öppna portalen igen.");
  location.reload();
}
