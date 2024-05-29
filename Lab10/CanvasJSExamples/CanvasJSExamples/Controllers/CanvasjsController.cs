using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CanvasJSExamples.Models;
using Newtonsoft.Json;  //Do serializacji danych 
using DataChartSources;
using Antlr.Runtime.Misc;
using Chart.Mvc.ComplexChart;
using Chart.Mvc.SimpleChart;
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

            //Zwrócenie widoku
            return View();
        }

        public ActionResult Funkcja1()
        {
            //Dane do rysowania wykresu liniowego (losowe)

            LiniowyInterface Funk1 = new F1Class(-5,5,0.2);

            
            //Zwrócenie danych do widoku Indeks w celu narysowania przy użyciu Canvasjs
            ViewBag.X = JsonConvert.SerializeObject(Funk1.GetX());
            ViewBag.Y = JsonConvert.SerializeObject(Funk1.GetY());


            //Zwrócenie widoku
            return View();
        }

        public ActionResult Funkcja1_chartjs()
        {
            LiniowyInterface Funk1 = new F1Class(-5, 5, 0.2);

            ViewBag.X = JsonConvert.SerializeObject(Funk1.GetX());
            ViewBag.Y = JsonConvert.SerializeObject(Funk1.GetY());


            return View();
        }

        public ActionResult Funkcja2_chartjs()
        {
            LiniowyInterface Funk2 = new F2Class(-5, 5, 0.2);

            ViewBag.X = JsonConvert.SerializeObject(Funk2.GetX());
            ViewBag.Y = JsonConvert.SerializeObject(Funk2.GetY());


            return View();
        }

        public ActionResult WykresSlupkowy()
        {
            List<string> labels = new List<string>() {"Ziemniak", "Marchewka", "Cebula", "Kapusta"};
            List<double> y1 = new List<double>();
            List<double> y2 = new List<double>();
            List<double> y3 = new List<double>();
            for (int i =0; i < labels.Count; i++)
            {
                y1.Add(random.Next(10, 100));
                y2.Add(random.Next(10, 100));
                y3.Add(random.Next(10, 100));
            }
            ViewBag.labels = JsonConvert.SerializeObject(labels);
            ViewBag.y1 = JsonConvert.SerializeObject(y1);
            ViewBag.y2 = JsonConvert.SerializeObject(y2);
            ViewBag.y3 = JsonConvert.SerializeObject(y3);


            return View();
        }

        public ActionResult WykresKolowy()
        {
            List<string> labels = new List<string>() { "Ziemniak", "Marchewka", "Cebula", "Kapusta" };
            List<double> y1 = new List<double>();
            for (int i = 0; i < labels.Count; i++)
            {
                y1.Add(random.Next(10, 100));
            }
            ViewBag.labels = JsonConvert.SerializeObject(labels);
            ViewBag.y1 = JsonConvert.SerializeObject(y1);


            return View();
        }

        public ActionResult WykresKombinowany()
        {
            List<string> labels = new List<string>() { "Ziemniak", "Marchewka", "Cebula", "Kapusta" };
            List<double> y1 = new List<double>();

            List<double> x2 = new List<double>();
            List<double> y2 = new List<double>();

            for (int i = 0; i < labels.Count; i++)
            {
                y1.Add(random.Next(10, 100));
            }
            for (double i = 0; i < 10; i+=0.2)
            {
                x2.Add(Math.Round(i, 1));
                y2.Add(Math.Sin(5.0 * i) + Math.Cos(3.0 * i));
            }

            ViewBag.labels = JsonConvert.SerializeObject(labels);
            ViewBag.y1 = JsonConvert.SerializeObject(y1);
            ViewBag.x2 = JsonConvert.SerializeObject(x2);
            ViewBag.y2 = JsonConvert.SerializeObject(y2);

            return View();
        }


        public ActionResult SlupkowyMVC()
        {
            List<string> labels = new List<string>() { "Ziemniak", "Marchewka", "Cebula", "Kapusta" };
            List<double> y1 = new List<double>();
            List<double> y2 = new List<double>();
            List<double> y3 = new List<double>();
            for (int i = 0; i < labels.Count; i++)
            {
                y1.Add(random.Next(10, 100));
                y2.Add(random.Next(10, 100));
                y3.Add(random.Next(10, 100));
            }

            var barChart = new BarChart();
            barChart.ComplexData.Labels.AddRange(labels);
            barChart.ComplexData.Datasets.AddRange(new List<ComplexDataset>
            {new ComplexDataset
            {
                Data = y1, Label = "2001", FillColor = "rgba(220,220,220,0.2)",
                StrokeColor = "rgba(220,220,220,1)", PointColor = "rgba(220,220,220,1)", PointStrokeColor = "#fff",
                PointHighlightFill = "#fff", PointHighlightStroke = "rgba(220,220,220,1)", },
            new ComplexDataset
            {
                Data = y2, Label = "2002", FillColor = "rgba(151,187,205,0.2)",
                    StrokeColor = "rgba(151,187,205,1)", PointColor = "rgba(151,187,205,1)", PointStrokeColor = "#fff",
                    PointHighlightFill = "#fff", PointHighlightStroke = "rgba(151,187,205,1)", },
            new ComplexDataset
            {
                Data = y3, Label = "2003", FillColor = "rgba(151,187,205,0.2)",
                    StrokeColor = "rgba(151,187,205,1)", PointColor = "rgba(151,187,205,1)", PointStrokeColor = "#fff",
                    PointHighlightFill = "#fff", PointHighlightStroke = "rgba(151,187,205,1)", }
            });

            ViewBag.BarChart = barChart;

            return View();
        }



    }
}