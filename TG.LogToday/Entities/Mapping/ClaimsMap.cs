using LogToday.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace LogToday.Entities.Mapping
{
    public class ClaimsMap : EntityTypeConfiguration<Claims>
    {
        public ClaimsMap()
        {
            // Primary Key
            this.HasKey(c => c.Id);
            // Propercies
            this.Property(c => c.Name).IsRequired().HasMaxLength(128);
            // cable & Column Mappings
            this.ToTable("AspNetClaims");
        }
    }
}