using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CanvasJSExamples.Models;
using Newtonsoft.Json;  //Do serializacji danych 

namespace CanvasJSExamples.Controllers
{
    public class CanvasjsController : Controller
    {
        //Generator liczb losowych
        public Random random;
        
        public CanvasjsController()
        {
            random = new Random();
        }


        // Defalut plot for ploting linear chart using Canvasjs library 
        // GET: Canvasjs
        public ActionResult Index()
        {
            double N = 10000; //liczba punktów
            double y = 100; //wartość dla osi OY
            //Dane do rysowania wykresu liniowego (losowe)

            List<DataPoint> dataPoints = new List<DataPoint>();

            for(int i=0;i<N;i++)
            {
                y += random.Next(-20, 20);
                dataPoints.Add(new DataPoint(i, y));
            }

            //Zwrócenie danych do widoku Indeks w celu narysowania przy użyciu Canvasjs
            ViewBag.DataPoints = JsonConvert.SerializeObject(dataPoints);


            //Funkcja1
            List<DataPoint> dataPoints2 = new List<DataPoint>();
            for (double i=-5; i<=5; i+=0.02)
            {
                y += Math.Sin(5 * i) + Math.Cos(3 * i);
                dataPoints2.Add(new DataPoint(i, y));
            }
            ViewBag.DataPoints2 = JsonConvert.SerializeObject(dataPoints2);


            //Zwrócenie widoku
            return View();
        }


        public ActionResult Funkcja1()
        {
            double y = 0;
            //Funkcja1
            List<DataPoint> dataPoints2 = new List<DataPoint>();
            for (double i = -5; i <= 5; i += 0.02)
            {
                y = Math.Sin(5 * i) + Math.Cos(3 * i);
                dataPoints2.Add(new DataPoint(i, y));
            }
            ViewBag.DataPoints2 = JsonConvert.SerializeObject(dataPoints2);


            //Zwrócenie widoku
            return View();
        }

        public ActionResult Funkcja2()
        {
            double y = 0;
            //Funkcja1
            List<DataPoint> dataPoints3 = new List<DataPoint>();
            for (double i = -5; i <= 5; i += 0.02)
            {
                y += (i * i) - 10 * Math.Cos(2 * Math.PI * i) + 10;
                dataPoints3.Add(new DataPoint(i, y));
            }
            ViewBag.DataPoints3 = JsonConvert.SerializeObject(dataPoints3);


            //Zwrócenie widoku
            return View();
        }


        public ActionResult Wykres1Slupki()
        {
            List<DataLabel> LabelSerie1 = new List<DataLabel>();
            List<DataLabel> LabelSerie2 = new List<DataLabel>();
            List<DataLabel> LabelSerie3 = new List<DataLabel>();
            List<string> labels = new List<string>() { "Jabłko", "Banan", "Pomidor", "Cebula" };

            for (int i = 0; i < labels.Count; i++)
            {
                LabelSerie1.Add(new DataLabel(random.Next(10, 100), labels[i]));
                LabelSerie2.Add(new DataLabel(random.Next(10, 100), labels[i]));
                LabelSerie3.Add(new DataLabel(random.Next(10, 100), labels[i]));
            }
            ViewBag.LabelSerie1 = JsonConvert.SerializeObject(LabelSerie1);
            ViewBag.LabelSerie2 = JsonConvert.SerializeObject(LabelSerie2);
            ViewBag.LabelSerie3 = JsonConvert.SerializeObject(LabelSerie3);
            //Zwrócenie widoku
            return View();
        }

        public ActionResult Wykres2Kolowy()
        {
            return Wykres1Slupki();
        }


        public ActionResult Wykres3Kombinowany()
        {
            //Column
            List<DataLabel> LabelSerie1 = new List<DataLabel>();
            List<string> labels = new List<string>() { "Jabłko", "Banan", "Pomidor", "Cebula" };


            for (int i = 0; i < labels.Count; i++)
            {
                LabelSerie1.Add(new DataLabel(random.Next(10, 100), labels[i]));
            }
            ViewBag.LabelSerie1 = JsonConvert.SerializeObject(LabelSerie1);



            //Line
            double y = 0;
            List<DataPoint> dataPoints = new List<DataPoint>();
            for (double i = 0; i <= 5; i += 0.2)
            {
                y = Math.Sin(5 * i) + Math.Cos(random.Next(2,10) * i)*2 + 20;
                dataPoints.Add(new DataPoint(i, y));
            }
            ViewBag.DataPoints = JsonConvert.SerializeObject(dataPoints);



            //Zwrócenie widoku
            return View();
        }

    }
}