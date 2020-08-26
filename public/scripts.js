
// FUNÇÃO PARA ADD OU REMOVER ESTILO DO MENU
const currentPage = window.location.pathname                    /* Pega a posição atual da página */
const menuItems = document.querySelectorAll("header .links a")  /*Pega cada item do menu */

for(item of menuItems){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}

/* O INCLUDE verifica se algum termo de uma String existe e retorna True or False
    Ex: "instructors/2".include("instructors") = True
        "instructors/2".include("2") = True
        "instructors/2".include("k") = False
*/

// FUNÇÃO PARA CONFIRMAR A EXCLUSÃO DE REGISTROS
function confirmDelete(){
    const formDelete = document.querySelector("#form-delete")

        formDelete.addEventListener("submit", function(event){
            const confirmation = confirm("Deseja Apagar?")

            if(!confirmation){
                event.preventDefault()
            }
        })
}

// FUNÇÃO PARA A PAGINAÇÃO
function paginate(selectedPage, totalPages){
    
    let pages = [],
        oldPage

    for(let currentPage = 1; currentPage <= totalPages; currentPage++){

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pageAfterSelectedPage = currentPage <= selectedPage + 2
        const pageBeforeSelectedPage = currentPage >= selectedPage - 2

        if(firstAndLastPage || pageAfterSelectedPage && pageBeforeSelectedPage){

            if(oldPage && currentPage - oldPage > 2){
                pages.push('...')
            }

            if(oldPage && currentPage - oldPage == 2){
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)
            oldPage = currentPage
        }
        
    }

    return pages
}

const pagination = document.querySelector(".pagination")
const page = +pagination.dataset.page                       // Esse + é uma conversão para Number
const total = +pagination.dataset.total
const pages = paginate(page, total)

console.log(pages)

let elements = ""

    for (let page of pages){

        if(String(page).includes('...')){
            elements += `<span>${page}</span>`
        }else{
            elements += `<a href="?page=${page}">${page}</a>`
        }

    }

pagination.innerHTML = elements