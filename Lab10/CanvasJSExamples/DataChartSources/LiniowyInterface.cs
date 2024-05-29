using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataChartSources
{
    public interface LiniowyInterface
    {
        List<double> GetX();
        List<string> GetXSF();
        List<double> GetY();
    }
}
