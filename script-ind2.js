// var ancho = window.innerWidth;
var ancho = document.getElementById("raiz").offsetWidth;
var alto = window.innerHeight;
console.log(ancho, alto);

var rel_yx = 0.5;
var Dx = ancho;
var Dy = rel_yx*ancho;
var dx = 0.085*Dx;
var dy = 0.11*Dy;
var t_cred = 0.25*dy;
var t_fuente = 0.008*Dx;
var t_titulo = 0.036*Dx;


var titulo = document.getElementById("titulo");
titulo.style.fontSize = t_titulo;

function convierte(d){
    return{
        curso: d.curso,
        sem: +d.sem,
        fila: +d.fila,
        ciclo: d.ciclo,
        ciclo_n: +d.ciclo_n,
        fila2: +d.fila2,
        creditos: +d.creditos
    }
};

function calc_creditos(d){
    if(d.creditos == 1) return [2,1,1]
    else if (d.creditos == 2) return [4,2,2]
    else return [4,5,3]
};

d3.csv("data.csv", convierte)
    .then(function(data){
        console.log(data);
        for(var i = 0; i<data.length; i++){
            console.log(calc_creditos(data[i]));
        }
        var pensum = d3.select("body")
            .select("#raiz")
            .selectAll("div")
            .data(data)
            .enter()
            .append("div")
            .style("position", "absolute")
            .style("display", "inline-block")
            .style("left", function(d){return (d.sem-1)*dx*1.2 + 0*dx})
            .style("top", function(d){return (d.fila2-1)*dy*1.2 + 2*t_titulo})
            .style("width", dx)
            .style("height", dy)
            .style("opacity", "0.9")
            // .attr("class", "cuadro comun")
            // .style("background-color", "rgb(200,200,200)")
            .attr("class", (d) => {return "cuadro comun " + "ciclo"+d.ciclo_n});

        var info = pensum.append("p").style("font-size", 1.5*t_fuente);
        info.append("span").text((d) => {return calc_creditos(d.creditos)[0] + " "});
        info.append("span").text((d) => {return calc_creditos(d.creditos)[1]+ " "});
        info.append("span").text((d) => {return calc_creditos(d.creditos)[2]+ " "})
            

        pensum.append("div")
            .style("display","flex")
            .style("height", "65%")
            // .style("margin","collapse")
            .style("align-items", "center")
            .style("justify-content", "center")
            // .append("div")
            .text((d) => {return d.curso})
            // .attr("text-anchor", "middle")
            .style("font-size", t_fuente)
            .style("text-align", "center")
                        
    })
