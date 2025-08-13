using System.ComponentModel.DataAnnotations.Schema;

[Table("ToaDo_ITRF")]
public class ToaDoItrf
{
    [Column("MakerName")]
    public string MakerName { get; set; }

    [Column("X")]
    public double? X { get; set; }

    [Column("Y")]
    public double? Y { get; set; }

    [Column("Z")]
    public double? Z { get; set; }

    [Column("Session")]
    public string Session { get; set; }

    [Column("B")]
    public double? B { get; set; }

    [Column("L")]
    public double? L { get; set; }

    [Column("H")]
    public double? H { get; set; }

    [Column("x_mp")]
    public double? X_Mp { get; set; }

    [Column("y_mp")]
    public double? Y_Mp { get; set; }
}
