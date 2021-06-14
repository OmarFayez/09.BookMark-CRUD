var siteName = document.getElementById("siteName")
var siteUrl = document.getElementById("siteUrl")
var submit = document.getElementById("submit")
var x ; // index Of site you Want To Update
var alert = document.getElementById("alert")
var sites =[];
var error=""
if(localStorage.getItem("sitelist")==null)
{
    var sites =[];
}
else
{
    sites =JSON.parse(localStorage.getItem("sitelist") ) 
    displaySite()
}

function submitBookMark ()
{
    if(submit.innerHTML==`Submit`)
    {
        if(checkInputs()==true &&noIteration()!=true)
        {
            var site =
            {
                name:siteName.value,
                url:siteUrl.value
            }
            sites.push(site)
            localStorage.setItem("sitelist",JSON.stringify(sites))
            displaySite()
            clearSite()
            alert.style="display:none"
        }
        else
        {
            alert.innerHTML=error
            alert.style="display:block"
        }
       
    }
    else
    {
       
        updateBookMark ()
    
    }
}
function updateBookMark ()
{
    if(checkInputs()==true&&noIteration()!=true)
    {
        sites.splice(x,1,{name:siteName.value ,url:siteUrl.value})
        localStorage.setItem("sitelist",JSON.stringify(sites))
        displaySite()
        clearSite()
        submit.innerHTML=`Submit`
        alert.style="display:none"
    }
    else
    {
        alert.innerHTML=error
        alert.style="display:block"
    }
}


function clearSite()
{
    siteName.value =``
    siteUrl.value=``
}

function displaySite()
{
    var tbody= document.getElementById("tbody")
    var cartona =``
    for ( var i= 0 ; i<sites.length ;i++)
    {
        cartona+=
        `
        <tr>
            <td class="d-none">${i}</td>
            <td>${sites[i].name}</td>
            <td><a class="btn btn-primary" target="_blank"  href="${sites[i].url}">Visit</a></td>
            <td><button onclick="updateSite(${i})" class="btn btn-warning" >Update</button></td>
            <td><button onclick="deleteSite(${i})" class="btn btn-outline-danger" >Delete</button></td>
         </tr>
        `
    }
    tbody.innerHTML=cartona
}

function updateSite(index)
{
    siteName.value = sites[index].name
    siteUrl.value  = sites[index].url
    submit.innerHTML=`Update`
    x=index
}

function deleteSite(index)
{
sites.splice(index,1)
localStorage.setItem("sitelist",JSON.stringify(sites))
displaySite()
submit.innerHTML=`Submit`
clearSite()

}

function checkInputs()
{
    if(siteName.value !=="" &&siteUrl.value !=="")
    {
        error = `Please Enter Site Name & Url`
        return true
    }
    else
    {

        return false
    }

}
function noIteration()
{
    for(let i= 0 ; i<sites.length;i++)
    {
        if(sites[i].url.toLowerCase()==siteUrl.value.toLowerCase())
        {
            error = `Site Already Exist`
            return true ;
        }
      
    }
}
