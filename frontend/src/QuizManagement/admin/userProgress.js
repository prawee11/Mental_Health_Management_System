import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'

function UserProgress(){

          const[serQuery,serSerQuery] = useState("");
          const [getResults,setResults] = useState([]);

          function searchfun(e){
                    
                    serSerQuery(e.target.value);
          }

          function getUserPro(){
                    axios.get("http://localhost:8050/quiz/getresultsadmin").then(res=>{
                              console.log(res.data)
                              setResults(res.data);
                    })  .catch(err=>{
                              console.log(err);
                    })        
          }

          useEffect(()=>{
                    getUserPro();
          },[])

          function downloadPDF(){
                    let timerInterval
                    Swal.fire({
                    title: 'Preparing your PDF',
                    html: 'Please wait <b></b> milliseconds.',
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                    }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer')
                    }
                    }).then(()=>{
        
        
                    const doc = new jsPDF('p','pt','a4');
                    var imgData ='<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+AAAAV7CAYAAACmVsXHAAAACXBIWXMAABJ0AAASdAHeZh94AAAGgWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTA1LTIwVDA4OjAwOjE5KzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA1LTIwVDA4OjAwOjE5KzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wNS0yMFQwODowMDoxOSswNTozMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiNjEwZGExZi0wNmZmLWFmNDItOGM2OS00ZDA4NDFlZTNmOTQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpmYWEwMGZjMi05ZmMzLWE5NDgtYWNkNC1jMDgyN2IyNzY3YTMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMjc0MTQ1Zi1kMWYwLTYzNDAtOTYzNi1mYWI4NzljMTA3ZmIiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjEyNzQxNDVmLWQxZjAtNjM0MC05NjM2LWZhYjg3OWMxMDdmYiIgc3RFdnQ6d2hlbj0iMjAyMy0wNS0yMFQwODowMDoxOSswNTozMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiNjEwZGExZi0wNmZmLWFmNDItOGM2OS00ZDA4NDFlZTNmOTQiIHN0RXZ0OndoZW49IjIwMjMtMDUtMjBUMDg6MDA6MTkrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cmRmOkJhZz4gPHJkZjpsaSBwaG90b3Nob3A6TGF5ZXJOYW1lPSJIYXBweSBMaWZlIiBwaG90b3Nob3A6TGF5ZXJUZXh0PSJIYXBweSBMaWZlIi8+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6VGV4dExheWVycz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Uk8H1AAAxqUlEQVR42u3dy5niyLaA0XQBFxj1HBfkAi4waAfkAi7gAi7IBVzABbmQp6qguh6nKhOEtGNHaMX3rTO5fbvJSBLi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AAhwAAAAEOAAAAAgwAEAAAABDgAAAAIcAAAABDgAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAIcAAAAECAAwAAgAAHAAAABDgAAAAIcAAAAGgtwN/+/QcAAABY2pf/eQcAAAAWZhIAAABAgAMAAIAABwAAAAQ4AAAACHAAAAAQ4AAAAIAABwAAAAEOAAAACHAAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAEuEkAAACAgAAHAAAAlmYSAAAAIMD7+zsAAACwMJMAAAAAAhwAAAAEOAAAACDAAQAAQIADAACAAAcAAAAEOAAAAAhwAAAAQIADAACAAAcAAAABDgAAAAhwAAAAEOAAAAAgwE0CAAAACHAAAAAQ4AAAAIAABwAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAEOAAAACDAAQAAQIADAACAAAcAAAAEOAAAAAhwAAAAQIADAACAAAcAAAABDgAAAAhwAAAAEOAAAACAAAcAAAABDgAAAAIcAAAAEOAAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAgwAEAAECAAwAAgAAHAAAABDgAAAAIcAAAAECAAwAAgAAHAAAAAQ4AAAAIcAAAABDgAAAAIMABAAAAAQ4AAAACHAAAABDgAAAAIMABAABAgAMAAAACHAAAAAQ4AAAAIMABAABAgAMAAIAABwAAAAQ4AAAACHAAAAAQ4AAAAIAABwAAAAEOAAAACHAAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAQIADAAAAAhwAAAAEOAAAAAhwAAAAQIADAACAAAcAAAAEOAAAAAhwAAAAEOAAAACAAAcAAAABDgAAAJgEAAAAEOAAAAAgwAEAAAABDgAAAAIcAAAABDgAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAIcAAAAECAAwAAgAAHAAAAAW4SAAAAQIADAACAAAcAAAAEOAAAAAhwAAAAEOAAAACAAAcAAAABDgAAAAhwAAAAEOAAAAAgwAEAAAABDgAAAAIcAAAABDgAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAIcAAAAECAAwAAgAAHAAAABDgAAAAIcAAAABDgAAAAgAAHAAAAAQ4AAAACHAAAABDgAAAAIMABAAAAAQ4AAAACHAAAAAQ4AAAAIMABAABAgAMAAAACHAAAAAQ4AAAACHAAAABAgAMAAIAABwAAAAEOAAAACHAAAAAQ4AAAAIAABwAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAEOAAAACDAAQAAQIADAACAAAcAAAAEOAAAAAhwAAAAQIADAACAAAcAAAABDgAAAAhwAAAAEOAAAACAAAcAAAABDgAAAAIcAAAAEOAAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAgwAEAAECAAwAAgAAHAAAABDgAAAAIcAAAAMAkAAAAgAAHAAAAAQ4AAAAIcAAAABDgAAAAIMABAAAAAQ4AAAACHAAAABDgAAAAIMABAABAgAMAAAACHAAAAAQ4AAAACHCTAAAAAAIcAAAABDgAAAAgwAEAAECAAwAAgAAHAAAABDgAAAAIcAAAAECAAwAAgAAHAAAAAQ4AAAAIcAAAABDgAAAAIMABAAAAAQ4AAAACHAAAABDgAAAAIMABAABAgAMAAAACHAAAAAQ4AAAAIMABAABAgAMAAIAABwAAAAQ4AAAACHAAAAAQ4AAAAIAABwAAAAEOAAAACHAAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAQIADAAAAAhwAAAAEOAAAAAhwAAAAQIADAACAAAcAAAAEOAAAAAhwAAAAEOAAAACAAAcAAAABDgAAAAhwAAAAEOAAAAAgwAEAAAABDgAAAAIcAAAABDgAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAIcAAAAECAAwAAgAAHAAAABDgAAAAIcAAAABDgAAAAgAAHAAAAAQ4AAAACHAAAABDgAAAAIMABAAAAAQ4AAAACHAAAAAQ4AAAAIMABAABAgAMAAAAmAQAAAAQ4AAAACHAAAABAgAMAAIAABwAAAAEOAAAACHAAAAAQ4AAAAIAABwAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAQICbBAAAABDgAAAAIMABAAAAAQ4AAAACHAAAAAQ4AAAAIMABAABAgAMAAAACHAAAAAQ4AAAACHAAAABAgAMAAIAABwAAAAEOAAAACHAAAAAQ4AAAAIAABwAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAEOAAAACDAAQAAQIADAACAAAcAAAAEOAAAAAhwAAAAQIADAACAAAcAAAABDgAAAAhwAAAAEOAAAACAAAcAAAABDgAAAAIcAAAAEOAAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAgwAEAAECAAwAAgAAHAAAABDgAAAAIcAAAAECAAwAAgAAHAAAAAQ4AAAAIcAAAABDgAAAAIMABAAAAAQ4AAAACHAAAABDgAAAAIMABAABAgAMAAAACHAAAAAQ4AAAAIMABAABAgAMAAIAABwAAAAQ4AAAACHAAAAAQ4AAAAIAABwAAAAEOAAAACHAAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAwCQAAACDAAQAAQIADAAAAAhwAAAAEOAAAAAhwAAAAQIADAACAAAcAAAAEOAAAAAhwAAAAEOAAAACAAAcAAAABDgAAAALcJAAAAIAABwAAAAEOAAAACHAAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAQIADAAAAAhwAAAAEOAAAAAhwAAAAQIADAACAAAcAAAAEOAAAAAhwAAAAEOAAAACAAAcAAAABDgAAAAhwAAAAEOAAAAAgwAEAAAABDgAAAAIcAAAABDgAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAIcAAAAECAAwAAgAAHAAAABDgAAAAIcAAAABDgAAAAgAAHAAAAAQ4AAAACHAAAABDgAAAAIMABAAAAAQ4AAAACHAAAAAQ4AAAAIMABAABAgAMAAAACHAAAAAQ4AAAACHAAAABAgAMAAIAABwAAAAEOAAAACHAAAAAQ4AAAAIAABwAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAEOAAAACDAAQAAQIADAACAAAcAAAAEOAAAAAhwAAAAQIADAACAAAcAAAABDgAAAAhwAAAAEOAAAACASQAAAAABDgAAAAIcAAAAEOAAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAgwAEAAECAAwAAgAAHAAAABDgAAAAIcAAAABDgJgEAAAAEOAAAAAhwAAAAQIADAACAAAcAAAABDgAAAAhwAAAAEOAAAACAAAcAAAABDgAAAAIcAAAAEOAAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAgwAEAAECAAwAAgAAHAAAABDgAAAAIcAAAAECAAwAAgAAHAAAAAQ4AAAAIcAAAABDgAAAAIMABAAAAAQ4AAAACHAAAABDgAAAAIMABAABAgAMAAAACHAAAAAQ4AAAAIMABAABAgAMAAIAABwAAAAQ4AAAACHAAAAAQ4AAAAIAABwAAAAEOAAAACHAAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAQIADAAAAAhwAAAAEOAAAAAhwAAAAQIADAACAAAcAAAAEOAAAAAhwAAAAEOAAAACAAAcAAAABDgAAAAhwAAAAEOAAAAAgwAEAAAABDgAAAAIcAAAABDgAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAIcAAAAECAAwAAgAAHAAAATAIAAAAIcAAAABDgAAAAgAAHAAAAAQ4AAAACHAAAABDgAAAAIMABAAAAAQ4AAAACHAAAAAQ4AAAAIMABAABAgAMAAIAANwkAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAIcAAAAECAAwAAgAAHAAAABDgAAAAIcAAAABDgAAAAgAAHAAAAAQ4AAAACHAAAABDgAAAAIMABAAAAAQ4AAAACHAAAAAQ4AAAAIMABAABAgAMAAAACHAAAAAQ4AAAACHAAAABAgAMAAIAABwAAAAEOAAAACHAAAAAQ4AAAAIAABwAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAEOAAAACDAAQAAQIADAACAAAcAAAAEOAAAAAhwAAAAQIADAACAAAcAAAABDgAAAAhwAAAAEOAAAACAAAcAAAABDgAAAAIcAAAAEOAAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAgwAEAAECAAwAAgAAHAAAABDgAAAAIcAAAAECAAwAAgAAHAAAAAQ4AAAAIcAAAABDgAAAAIMABAAAAAQ4AAAACHAAAABDgAAAAIMABAABAgAMAAAACHAAAAAQ4AAAAYBIAAABAgAMAAIAABwAAAAQ4AAAACHAAAAAQ4AAAAIAABwAAAAEOAAAACHAAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAEuEkAAAAAAQ4AAAACHAAAABDgAAAAIMABAABAgAMAAAACHAAAAAQ4AAAAIMABAABAgAMAAIAABwAAAAQ4AAAACHAAAAAQ4AAAAIAABwAAAAEOAAAACHAAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAQIADAAAAAhwAAAAEOAAAAAhwAAAAQIADAACAAAcAAAAEOAAAAAhwAAAAEOAAAACAAAcAAAABDgAAAAhwAAAAEOAAAAAgwAEAAAABDgAAAAIcAAAABDgAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAIcAAAAECAAwAAgAAHAAAABDgAAAAIcAAAABDgAAAAgAAHAAAAAQ4AAAACHAAAABDgAAAAIMABAAAAAQ4AAAACHAAAAAQ4AAAAIMABAABAgAMAAAACHAAAAAQ4AAAACHAAAABAgAMAAIAABwAAAAEOAAAACHAAAAAQ4AAAAIAABwAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAAJMAAAAAAhwAAAAEOAAAACDAAQAAQIADAACAAAcAAAAEOAAAAAhwAAAAQIADAACAAAcAAAABDgAAAAhwAAAAEOAAAAAgwE0CAAAACHAAAAAQ4AAAAIAABwAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAEOAAAACDAAQAAQIADAACAAAcAAAAEOAAAAAhwAAAAQIADAACAAAcAAAABDgAAAAhwAAAAEOAAAACAAAcAAAABDgAAAAIcAAAAEOAAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAgwAEAAECAAwAAgAAHAAAABDgAAAAIcAAAAECAAwAAgAAHAAAAAQ4AAAAIcAAAABDgAAAAIMABAAAAAQ4AAAACHAAAABDgAAAAIMABAABAgAMAAAACHAAAAAQ4AAAAIMABAABAgAMAAIAABwAAAAQ4AAAACHAAAAAQ4AAAAIAABwAAAAEOAAAACHAAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAQIADAAAAAhwAAAAEOAAAAAhwAAAAQIADAACAAAcAAAAEOAAAAAhwAAAAEOAAAACAAAcAAAABDgAAAJgEAAAAEOAAAAAgwAEAAAABDgAAAAIcAAAABDgAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAIcAAAAECAAwAAgAAHAAAAAW4SAAAAQIADAACAAAcAAAAEOAAAAAhwAAAAEOAAAACAAAcAAAABDgAAAAhwAAAAEOAAAAAgwAEAAAABDgAAAAIcAAAABDgAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAIcAAAAECAAwAAgAAHAAAABDgAAAAIcAAAABDgAAAAgAAHAAAAAQ4AAAACHAAAABDgAAAAIMABAAAAAQ4AAAACHAAAAAQ4AAAAIMABAABAgAMAAAACHAAAAAQ4AAAACHAAAABAgAMAAIAABwAAAAEOAAAACHAAAAAQ4AAAAIAABwAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAEOAAAACDAAQAAQIADAACAAAcAAAAEOAAAAAhwAAAAQIADAACAAAcAAAABDgAAAAhwAAAAEOAAAACAAAcAAAABDgAAAAIcAAAAEOAAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAgwAEAAECAAwAAgAAHAAAABDgAAAAIcAAAAMAkAAAAgAAHAAAAAQ4AAAAIcAAAABDgAAAAIMABAAAAAQ4AAAACHAAAABDgAAAAIMABAABAgAMAAAACHAAAAAQ4AAAACHCTAAAAAAIcAAAABDgAAAAgwAEAAECAAwAAgAAHAAAABDgAAAAIcAAAAECAAwAAgAAHAAAAAQ4AAAAIcAAAABDgAAAAIMABAAAAAQ4AAAACHAAAABDgAAAAIMABAABAgAMAAAACHAAAAAQ4AAAAIMABAABAgAMAAIAABwAAAAQ4AAAACHAAAAAQ4AAAAIAABwAAAAEOAAAACHAAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAQIADAAAAAhwAAAAEOAAAAAhwAAAAQIADAACAAAcAAAAEOAAAAAhwAAAAEOAAAACAAAcAAAABDgAAAAhwAAAAEOAAAAAgwAEAAAABDgAAAAIcAAAABDgAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAIcAAAAECAAwAAgAAHAAAABDgAAAAIcAAAABDgAAAAgAAHAAAAAQ4AAAACHAAAABDgAAAAIMABAAAAAQ4AAAACHAAAAAQ4AAAAIMABAABAgAMAAAAmAQAAAAQ4AAAACHAAAABAgAMAAIAABwAAAAEOAAAACHAAAAAQ4AAAAIAABwAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAQICbBAAAABDgAAAAIMABAAAAAQ4AAAACHAAAAAQ4AAAAIMABAABAgAMAAAACHAAAAAQ4AAAACHAAAABAgAMAAIAABwAAAAEOAAAACHAAAAAQ4AAAAIAABwAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAEOAAAACDAAQAAQIADAACAAAcAAAAEOAAAAAhwAAAAQIADAACAAAcAAAABDgAAAAhwAAAAEOAAAACAAAcAAAABDgAAAAIcAAAAEOAAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAgwAEAAECAAwAAgAAHAAAABDgAAAAIcAAAAECAAwAAgAAHAAAAAQ4AAAAIcAAAABDgAAAAIMABAAAAAQ4AAAACHAAAABDgAAAAIMABAABAgAMAAAACHAAAAAQ4AAAAIMABAABAgAMAAIAABwAAAAQ4AAAACHAAAAAQ4AAAAIAABwAAAAEOAAAACHAAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAwCQAAACDAAQAAQIADAAAAAhwAAAAEOAAAAAhwAAAAQIADAACAAAcAAAAEOAAAAAhwAAAAEOAAAACAAAcAAAABDgAAAALcJAAAAIAABwAAAAEOAAAACHAAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAQIADAAAAAhwAAAAEOAAAAAhwAAAAQIADAACAAAcAAAAEOAAAAAhwAAAAEOAAAACAAAcAAAABDgAAAAhwAAAAEOAAAAAgwAEAAAABDgAAAAIcAAAABDgAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAIcAAAAECAAwAAgAAHAAAABDgAAAAIcAAAABDgAAAAgAAHAAAAAQ4AAAACHAAAABDgAAAAIMABAAAAAQ4AAAACHAAAAAQ4AAAAIMABAABAgAMAAAACHAAAAAQ4AAAACHAAAABAgAMAAIAABwAAAAEOAAAACHAAAAAQ4AAAAIAABwAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAEOAAAACDAAQAAQIADAACAAAcAAAAEOAAAAAhwAAAAQIADAACAAAcAAAABDgAAAAhwAAAAEOAAAACASQAAAAABDgAAAAIcAAAAEOAAAAAgwAEAAECAAwAAAAIcAAAABDgAAAAgwAEAAECAAwAAgAAHAAAABDgAAAAIcAAAABDgJgEAAAAEOAAAAAhwAAAAQIADAACAAAcAAAABDgAAAAhwAAAAEOAAAACAAAcAAIACAf727z8AAADA0r78zzsAAACwMJMAAAAAAhwAAAAEOAAAACDAAQAAQIADAACAAAcAAAAEOAAAAAhwAAAAQIADAACAAAcAAAABDgAAAAhwAAAAEOAAAAAgwE0CAAAACHAAAAAQ4AAAAIAABwAAAAEOAAAAAhwAAAAQ4AAAACDAAQAAAAEOAAAAAhwAAAAEOAAAACDAAQAAQIADAACAAAcAAAAEOAAAAAhwAAAAQIADAABAAv8DYlexS0pNpgQAAAAASUVORK5CYII=" alt="" />';
                    var width = doc.internal.pageSize.getWidth();
                    var hight = doc.internal.pageSize.getHeight()
        
                   
                     var pageSize = doc.internal.pageSize;
                     // jsPDF 1.4+ uses getHeight, <1.4 uses .height
                     var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                     // jsPDF 1.4+ uses getWidth, <1.4 uses .width
                     var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
         
                     doc.autoTable({
                         html: '#my-table',
                         startY: pageHeight - 700,
                         theme: 'grid'
                     });
        
                     var today = new Date();
                        var curr_date = today.getDate();
                        var curr_month = today.getMonth();
                        var curr_year = today.getFullYear();
                  
                        today = [curr_month + 1] + "/ " + curr_date + "/ " + curr_year;
                        var newdat = today;
         
        
                   
                   
                   /////// doc.addImage(imgData,'PNG',0,0,width,hight)
                   // doc.text("Available Supplies",20,10);
                   doc.text(newdat,450,108);
                    doc.autoTable({
                      
                          head: [['User Name', 'Email', 'Contact Nu','Closest Name','Closest Con Nu','Closest Email','Quiz Name','Results']],
                          body:  getResults.filter(items=>

                            items.userName.toLowerCase().includes(serQuery)||
                            items.quizName.toLowerCase().includes(serQuery)
                                
                                ).map(function(items){
                                          return( 
                                         [ 
                                          items.userName , 
                                          items.email,
                                          items.contactNo,
                                          items.nameOfClosest,
                                          items.closestContactNo,
                                          items.closestEmail,
                                          items.quizName,
                                          items.results,
                                        ] 
                                             
                                                    
                                          );
                                }) 
        
                                })
                    
        
                    doc.save("User Progress.pdf");
        
                      })
                  }

          return(<div>
       

          

          <section class="vh-50 gradient-custom">
                    <div class="container py-5 h-50">
                      <div class="row justify-content-center align-items-center h-100">
                        <div class=" col-xl-12">
                          <div class="card shadow-2-strong card-registration" style={{borderRadius: 15+"px"}}>
                            <div class="card-body p-4 p-md-5">
                            
                          

                            <div class="row">
                                  <div class="col-md-6 mb-4">

                                  
                                  <h4 class="mb-3 font-medium text-xl underline">User Progress</h4>
                                  <button onClick={downloadPDF} className="px-3 py-2 font-bold text-white bg-red-800 border border-yellow-600 rounded hover:bg-yellow-700">Download data set     <i class="bi bi-arrow-down-circle"></i></button>
                                  </div>
                                  <div class="col-md-6 mb-4">

                                    <div class="form-outline">
                                      <input type="text" id="Marks4" placeholder="Search" class="form-control form-control"  onChange={searchfun}/>
                                      
                                    </div>
                                  </div>
                                </div>





                    <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact Nu</th>
                        <th scope="col">Closest Name</th>
                        <th scope="col">Closest Con Nu</th>
                        <th scope="col">Closest Email</th>
                        <th scope="col">Quiz Name</th>
                        <th scope="col">Results</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                    {
                              getResults.filter(items=>

                              items.userName.toLowerCase().includes(serQuery)||
                              items.quizName.toLowerCase().includes(serQuery)
                              ).map(function(item){
                                        return(<tr scope="row">
                                                  <td><strong>{item.userName}</strong></td>
                                                  <td>{item.email}</td>
                                                  <td>{item.contactNo}</td>
                                                  <td>{item.nameOfClosest}</td>
                                                  <td>{item.closestContactNo}</td>
                                                  <td>{item.closestEmail}</td>
                                                  <td><strong>{item.quizName}</strong></td>
                                                  <td><strong>{item.results}</strong></td>
                                                
                                         </tr>)
                              })
                    }
                    </tbody>
                    </table>
                    </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </section>
          </div>)
}

export default UserProgress;