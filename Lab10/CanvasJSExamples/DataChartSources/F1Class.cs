using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataChartSources
{
    public class F1Class: LiniowyInterface
    {
        //public double min {  get; set; }
        //public double max { get; set; }
        //public double step { get; set; }
        public List<double> x {  get; set; } = new List<double>();
        public List<double> y { get; set; } = new List<double>();
        public F1Class(double min, double max, double step) {
            for(double i = min; i <= max; i+=step) { 
                x.Add(Math.Round(i, 1));
                y.Add(Math.Sin(5.0 * i) + Math.Cos(3.0*i));
            }
        }

        public List<double> GetX()
        {
            return x;
        }

        public List<string> GetXSF()
        {
            List<string> text = new List<string>();
            for(int i = 0; i < x.Count; i++)
            {
                text.Add(x[i].ToString());

            }
            return text;
        }

        public List<double> GetY()
        {
            return y;
        }
    }
}
