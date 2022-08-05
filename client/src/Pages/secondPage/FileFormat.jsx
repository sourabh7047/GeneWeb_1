const FileFormat = {
  databaseData: {
    bioproject: {
      Filetype: {
        XML: {
          retype: "xml",
          retmode: "xml",
        },
      },
      datalist: ["XML"],
    },
    biosample: {
      Filetype: {
        XML: {
          retype: "full",
          retmode: "xml",
        },
        TEXT: {
          retype: "full",
          retmode: "text",
        },
      },
      datalist: ["XML", "TEXT"],
    },
    biosystems: {
      Filetype: {
        XML: {
          retype: "xml",
          retmode: "xml",
        },
      },
      datalist: ["XML"],
    },
    gds: {
      Filetype: {
        SUMMARY: {
          retype: "summary",
          retmode: "text",
        },
      },
      datalist: ["SUMMARY"],
    },
    gene: {
      Filetype: {
        "text ASN.1": {
          retype: "null",
          retmode: "asn.1",
        },
        XML: {
          retype: "null",
          retmode: "xml",
        },
        "Gene table": {
          retype: "gene_table",
          retmode: "text",
        },
      },
      datalist: ["text ASN.1", "XML", "Gene table"],
    },
    homologene: {
      Filetype: {
        "text ASN.1": {
          retype: "null",
          retmode: "asn.1",
        },
        XML: {
          retype: "null",
          retmode: "xml",
        },
        "Alignment scores": {
          retype: "alignmentscores",
          retmode: "text",
        },
        Fasta: {
          retype: "fasta",
          retmode: "text",
        },
        HomoloGene: {
          retype: "homologene",
          retmode: "text",
        },
      },
      datalist: [
        "text ASN.1",
        "XML",
        "Alignment scores",
        "Fasta",
        "HomoloGene",
      ],
    },
    mesh: {
      Filetype: {
        "Full record": {
          retype: "full",
          retmode: "text",
        },
      },
      datalist: ["Full record"],
    },
    nuccore: {
      Filetype: {
        "text ASN.1": {
          retype: "null",
          retmode: "text",
        },
        "binary ASN.1": {
          retype: "null",
          retmode: "asn.1",
        },
        "Full record in XML": {
          retype: "native",
          retmode: "xml",
        },
        "accession number": {
          retype: "acc",
          retmode: "text",
        },
        Fasta: {
          retype: "fasta",
          retmode: "text",
        },
        "TInySeq XML": {
          retype: "fasta",
          retmode: "xml",
        },
        "SeqID string": {
          retype: "seqid",
          retmode: "text",
        },
        "GenBank with full seq": {
          retype: "gbwithparts",
          retmode: "text",
        },
        "CDS nucleotide Fasta": {
          retype: "fasta_cds_na",
          retmode: "text",
        },
        "CDS protein Fasta": {
          retype: "fasta_cds_na",
          retmode: "text",
        },
        "Feature table": {
          retype: "ft",
          retmode: "text",
        },
        "GenBank flat file": {
          retype: "gb",
          retmode: "text",
        },
        "GBSeq XML": {
          retype: "gb",
          retmode: "xml",
        },
        INSDSeq: {
          retype: "gbc",
          retmode: "xml",
        },
      },
      datalist: [
        "text ASN.1",
        "binary ASN.1",
        "Full record in XML",
        "accession number",
        "Fasta",
        "TInySeq XML",
        "SeqID string",
        "Feature table",
        "GenPept flat file",
        "GBSeq XML",
        "INSDSeq XML",
      ],
    },
    nucest: {
      Filetype: {
        "text ASN.1": {
          retype: "null",
          retmode: "text",
        },
        "binary ASN.1": {
          retype: "null",
          retmode: "asn.1",
        },
        "Full record in XML": {
          retype: "native",
          retmode: "xml",
        },
        "accession number": {
          retype: "acc",
          retmode: "text",
        },
        Fasta: {
          retype: "fasta",
          retmode: "text",
        },
        "TInySeq XML": {
          retype: "fasta",
          retmode: "xml",
        },
        "SeqID string": {
          retype: "seqid",
          retmode: "text",
        },
        "GenBank with full seq": {
          retype: "gbwithparts",
          retmode: "text",
        },
        "CDS nucleotide Fasta": {
          retype: "fasta_cds_na",
          retmode: "text",
        },
        "CDS protein Fasta": {
          retype: "fasta_cds_na",
          retmode: "text",
        },
        "Feature table": {
          retype: "ft",
          retmode: "text",
        },
        "GenBank flat file": {
          retype: "gb",
          retmode: "text",
        },
        "GBSeq XML": {
          retype: "gb",
          retmode: "xml",
        },
        INSDSeq: {
          retype: "gbc",
          retmode: "xml",
        },
      },
      datalist: [
        "text ASN.1",
        "binary ASN.1",
        "Full record in XML",
        "accession number",
        "Fasta",
        "TInySeq XML",
        "SeqID string",
        "Feature table",
        "GenPept flat file",
        "GBSeq XML",
        "INSDSeq XML",
        "CDS nucleotide Fasta",
        "CDS protein Fasta",
      ],
    },
    nucgss: {
      Filetype: {
        "text ASN.1": {
          retype: "null",
          retmode: "text",
        },
        "binary ASN.1": {
          retype: "null",
          retmode: "asn.1",
        },
        "Full record in XML": {
          retype: "native",
          retmode: "xml",
        },
        "accession number": {
          retype: "acc",
          retmode: "text",
        },
        Fasta: {
          retype: "fasta",
          retmode: "text",
        },
        "TInySeq XML": {
          retype: "fasta",
          retmode: "xml",
        },
        "SeqID string": {
          retype: "seqid",
          retmode: "text",
        },
        "GenBank flat file": {
          retype: "gb",
          retmode: "text",
        },
        "GBSeq XML": {
          retype: "gb",
          retmode: "xml",
        },
        INSDSeq: {
          retype: "gbc",
          retmode: "xml",
        },
      },
      datalist: [
        "text ASN.1",
        "binary ASN.1",
        "Full record in XML",
        "accession number",
        "Fasta",
        "TInySeq XML",
        "SeqID string",
        "Feature table",
        "GenPept flat file",
        "GBSeq XML",
        "INSDSeq XML",
      ],
    },
    protein: {
      Filetype: {
        "text ASN.1": {
          retype: "null",
          retmode: "text",
        },
        "binary ASN.1": {
          retype: "null",
          retmode: "asn.1",
        },
        "Full record in XML": {
          retype: "native",
          retmode: "xml",
        },
        "accession number": {
          retype: "acc",
          retmode: "text",
        },
        Fasta: {
          retype: "fasta",
          retmode: "text",
        },
        "TInySeq XML": {
          retype: "fasta",
          retmode: "xml",
        },
        "SeqID string": {
          retype: "seqid",
          retmode: "text",
        },
        "Feature table": {
          retype: "ft",
          retmode: "text",
        },
        "GenPept flat file": {
          retype: "gp",
          retmode: "text",
        },
        "GBSeq XML": {
          retype: "gp",
          retmode: "xml",
        },
        "INSDSeq XML": {
          retype: "gpc",
          retmode: "xml",
        },
        "Identical Protein XML": {
          retype: "ipg",
          retmode: "xml",
        },
      },
      datalist: [
        "text ASN.1",
        "binary ASN.1",
        "Full record in XML",
        "accession number",
        "Fasta",
        "TInySeq XML",
        "SeqID string",
        "Feature table",
        "GenPept flat file",
        "GBSeq XML",
        "INSDSeq XML",
        "Identical Protein XML",
      ],
    },
    popset: {
      Filetype: {
        "text ASN.1": {
          retype: "null",
          retmode: "text",
        },
        "binary ASN.1": {
          retype: "null",
          retmode: "asn.1",
        },
        "Full record in XML": {
          retype: "native",
          retmode: "xml",
        },
        "accession number": {
          retype: "acc",
          retmode: "text",
        },
        Fasta: {
          retype: "fasta",
          retmode: "text",
        },
        "TInySeq XML": {
          retype: "fasta",
          retmode: "xml",
        },
        "SeqID string": {
          retype: "seqid",
          retmode: "text",
        },
        "GenBank flat file": {
          retype: "gb",
          retmode: "text",
        },
        "GBSeq XML": {
          retype: "gb",
          retmode: "xml",
        },
        INSDSeq: {
          retype: "gbc",
          retmode: "xml",
        },
      },
      datalist: [
        "text ASN.1",
        "binary ASN.1",
        "Full record in XML",
        "accession number",
        "Fasta",
        "TInySeq XML",
        "SeqID string",
        "Feature table",
        "GenPept flat file",
        "GBSeq XML",
        "INSDSeq XML",
      ],
    },
    sra: {
      Filetype: {
        XML: {
          retype: "full",
          retmode: "xml",
        },
        datalist: ["XML"],
      },
    },
    taxonomy: {
      Filetype: {
        XML: {
          retype: "null",
          retmode: "xml",
        },
        "TaxID list": {
          retype: "uilist",
          retmode: "text",
        },
      },
      datalist: ["TaxID list", "XML"],
    },
    clinvar: {
      Filetype: {
        "CLinVar Set": {
          retype: "clinvarset",
          retmode: "xml",
        },
        "UID list": {
          retype: "uilist",
          retmode: "xml",
        },
      },
      datalist: ["CLinVar Set", "UID list"],
    },
    gtr: {
      Filetype: {
        "GTR Test Report": {
          retype: "gtracc",
          retmode: "xml",
        },
      },
    },
    datalist: ["GTR Test Report"],
  },
  databaseList: [
    "bioproject",
    "biosample",
    "biosystems",
    "gds",
    "gene",
    "homologene",
    "mesh",
    "nuccore",
    "nucest",
    "nucgss",
    "protein",
    "popset",
    "sra",
    "taxonomy",
    "clinvar",
    "gtr",
  ],
};

export default FileFormat;
