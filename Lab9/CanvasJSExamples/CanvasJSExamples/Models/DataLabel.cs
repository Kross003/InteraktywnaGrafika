using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace CanvasJSExamples.Models
{
    
    [DataContract]
    public class DataLabel
    {
        //Constructor of the point
        public DataLabel(double y, string label)
        {
            Y = y;
            this.label = label;
        }

        [DataMember(Name = "y")]
        public Nullable<double> Y = null;

        [DataMember(Name = "label")]
        public string label = null;

    }
}