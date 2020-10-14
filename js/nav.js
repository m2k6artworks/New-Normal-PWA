document.addEventListener("DOMContentLoaded", function() {
    // Activate sidebar nav
    const elems = qselect(".sidenav",true);
    M.Sidenav.init(elems);
    loadNav();
 
    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status != 200) return;
       
            // Muat daftar tautan menu
            qselect(".topnav, .sidenav",true).forEach(function(elm) {
              elm.innerHTML = xhttp.responseText;
            });

            const collapsible = qselect('.collapsible',true);
            const collapsibleCall = M.Collapsible.init(collapsible, {accordion: true});
       
            // Daftarkan event listener untuk setiap tautan menu
            qselect(".sidenav a, .topnav a",true).forEach(function(elm) {
              elm.addEventListener("click", function(event) {
                // // Tutup sidenav
                if (window.innerWidth <= 992) {
                  const sidenav = qselect(".sidenav");
                  M.Sidenav.getInstance(sidenav).close();                  
                }
       
                // Muat konten halaman yang dipanggil
                page = event.target.getAttribute("href").substr(1);
                loadPage(page);
              });
            });
          }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    // Load page content
    let page = window.location.hash.substr(1);
    if (page == "") page = "definition";
    loadPage(page);
 
    function loadPage(page) {
        const xhttp = new XMLHttpRequest();
        const parser = new DOMParser();
        
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                
                let requestTitle, requestContent, requestImage, requestColumn = "";
                const title = qselect("#body-title");
                const content = qselect('#body-content');
                const column = qselect('#body-column');
                const contentCard = qselect("#body-card-content");
                const imageCard = qselect("#body-card-image");
                const covidCard = qselect("#data-covid");
                const navItems = qselect(".sidenav li a",true);

                const xhttpParse = parser.parseFromString(xhttp.responseText,"text/html");
                requestTitle  = xhttpParse.querySelector("#title-page").innerHTML;
                requestContent = xhttpParse.querySelector("#content-page").innerHTML;
                requestImage = xhttpParse.querySelector("#content-image"); 
                requestColumn = xhttpParse.querySelector("#content-column");

                if (this.status == 200) {
                    
                    title.innerHTML = requestTitle
                    contentCard.innerHTML = requestContent
                    imageCard.src = requestImage.getAttribute('src')
                    imageCard.alt = requestImage.getAttribute('alt')
                    covidCard.style.display = "block"
                    column.classList.replace('l6', 'l8')
                    column.classList.replace('s8', 's12')

                    navItems.forEach(navBtn => {
                      navBtn.classList.remove("nav-select"); 
                      if (page===navBtn.getAttribute('href').substr(1))
                      { 
                        navBtn.classList.add("nav-select"); 
                      }
                    })

                    if (page=="about-devs") {
                      reqCol = requestColumn.getAttribute('class').split(' ');
                      column.classList.remove('s12','l8')
                      column.classList.add(reqCol[0],reqCol[1])
                      covidCard.style.display = "none"
                    }

                    const imageZoom = qselect('.materialboxed',true);
                    const materialBox = M.Materialbox.init(imageZoom, { inDuration: 300 });
                    
                } else if (this.status == 404) {
                    title.innerHTML = "404 Halaman tidak ditemukan.";
                } else {
                    tittle.innerHTML = "Ups.. halaman tidak dapat diakses";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
});