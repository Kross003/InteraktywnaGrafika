using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace CanvasJSExamples.Models
{
    
    [DataContract]
    public class DataPoint
    {
        //Constructor of the point
        public DataPoint(double x, double y)
        {
            X = x;
            Y = y;
        }

        [DataMember(Name = "x")]
        public Nullable<double> X = null;

        [DataMember(Name = "y")]
        public Nullable<double> Y = null;

    }
}