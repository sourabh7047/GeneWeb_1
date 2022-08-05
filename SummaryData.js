export default function SumData(singleQueryPage, DBdata) {
  let summary = [];

  switch (DBdata) {
    case "ipg":
      singleQueryPage.result.uids.map((eleSummary) => {
        const tempSummary = {
          Title: `${singleQueryPage.result[eleSummary].title}`,
          UniqeKey: `${singleQueryPage.result[eleSummary].accession}`,
          NumData: `${singleQueryPage.result[eleSummary].proteincount}`,
          VarientOne: `${singleQueryPage.result[eleSummary].ipg}`,
          VarientSecond: `${singleQueryPage.result[eleSummary].organism}`,
        };

        summary.push(tempSummary);
      });
      // console.log(length);
      console.log(summary);
      break;

    case "pubmed":
      singleQueryPage.result.uids.map((eleSummary) => {
        const tempSummary = {
          Title: `${singleQueryPage.result[eleSummary].title}`,
          UniqeKey: `nlm_id: ${singleQueryPage.result[eleSummary].nlmuniqueid}`,
          NumData: `pubdate: ${singleQueryPage.result[eleSummary].pubdate}`,
          VarientOne: `source: ${singleQueryPage.result[eleSummary].source}`,
          VarientSecond: `lastauthor: ${singleQueryPage.result[eleSummary].lastauthor}`,
        };

        summary.push(tempSummary);
      });
      // console.log(length);
      console.log(summary);
      break;

    case "protein":
    case "nuccore":
    case "nucleotide":
      singleQueryPage.result.uids.map((eleSummary) => {
        const tempSummary = {
          Title: `${singleQueryPage.result[eleSummary].title}`,
          UniqeKey: `caption: ${singleQueryPage.result[eleSummary].caption}`,
          NumData: `sequence length: ${singleQueryPage.result[eleSummary].slen}`,
          VarientOne: `extra: ${singleQueryPage.result[eleSummary].extra}`,
          VarientSecond: `organism: ${singleQueryPage.result[eleSummary].organism}`,
        };

        summary.push(tempSummary);
      });
      // console.log(length);
      console.log(summary);
      break;

    case "structure":
      singleQueryPage.result.uids.map((eleSummary) => {
        const tempSummary = {
          Title: `${singleQueryPage.result[eleSummary].pdbdescr}`,
          UniqeKey: `pdb id: ${singleQueryPage.result[eleSummary].pdbacc}`,
          NumData: `pdb class:${singleQueryPage.result[eleSummary].pdbclass}`,
          VarientOne: `resolution: ${singleQueryPage.result[eleSummary].resolution}`,
          VarientSecond: `expmethod: ${singleQueryPage.result[eleSummary].expmethod}`,
        };

        summary.push(tempSummary);
      });
      // console.log(length);
      console.log(summary);
      break;

    case "assembly":
      singleQueryPage.result.uids.map((eleSummary) => {
        const tempSummary = {
          Title: `${singleQueryPage.result[eleSummary].organism}`,
          UniqeKey: `assembly accession:${singleQueryPage.result[eleSummary].assemblyaccession}`,
          NumData: `speciestaxid: ${singleQueryPage.result[eleSummary].speciestaxid}`,
          VarientOne: `assembly name: ${singleQueryPage.result[eleSummary].assemblyname}`,
          VarientSecond: `assembly type: ${singleQueryPage.result[eleSummary].assemblytype}`,
        };

        summary.push(tempSummary);
      });
      // console.log(length);
      console.log(summary);
      break;

    case "genome":
      singleQueryPage.result.uids.map((eleSummary) => {
        const tempSummary = {
          Title: `${singleQueryPage.result[eleSummary].organism_name}`,
          UniqeKey: `project accession: ${singleQueryPage.result[eleSummary].project_accession}`,
          NumData: `${singleQueryPage.result[eleSummary].number_of_chromosomes}`,
          VarientOne: `number of chromosomes: ${singleQueryPage.result[eleSummary].organism_kingdom}`,
          VarientSecond: `organism subgroup: ${singleQueryPage.result[eleSummary].organism_subgroup}`,
        };

        summary.push(tempSummary);
      });
      // console.log(length);
      console.log(summary);
      break;

    case "annotinfo":
      singleQueryPage.result.uids.map((eleSummary) => {
        const tempSummary = {
          Title: `${singleQueryPage.result[eleSummary].organism}`,
          UniqeKey: `annottargetset: ${singleQueryPage.result[eleSummary].annottargetset}`,
          NumData: `report url: ${singleQueryPage.result[eleSummary].reporturl}`,
          VarientOne: `blasturl: ${singleQueryPage.result[eleSummary].blasturl}`,
          VarientSecond: `mapviewerurl :${singleQueryPage.result[eleSummary].mapviewerurl}`,
        };
        summary.push(tempSummary);
      });

      break;

    case "bioproject":
      singleQueryPage.result.uids.map((eleSummary) => {
        const tempSummary = {
          Title: `${singleQueryPage.result[eleSummary].project_title}`,
          UniqeKey: `project accession: ${singleQueryPage.result[eleSummary].project_acc}`,
          NumData: `project id: ${singleQueryPage.result[eleSummary].project_id}`,
          VarientOne: `taxanomy id:${singleQueryPage.result[eleSummary].taxid}`,
          VarientSecond: `organism name:${singleQueryPage.result[eleSummary].organism_name}`,
        };
        summary.push(tempSummary);
      });
      console.log(summary);
      break;

    case "biosample":
      singleQueryPage.result.uids.map((eleSummary) => {
        const tempSummary = {
          Title: `${singleQueryPage.result[eleSummary].title}`,
          UniqeKey: `accession: ${singleQueryPage.result[eleSummary].accession}`,
          NumData: `sourcesample: ${singleQueryPage.result[eleSummary].sourcesample}`,
          VarientOne: `taxonomy: ${singleQueryPage.result[eleSummary].taxonomy}`,
          VarientSecond: `organism: ${singleQueryPage.result[eleSummary].organism}`,
        };
        summary.push(tempSummary);
      });
      console.log(summary);
      break;

    case "blastdbinfo":
      singleQueryPage.result.uids.map((eleSummary) => {
        const tempSummary = {
          Title: `${singleQueryPage.result[eleSummary].title}`,
          UniqeKey: `taxid: ${singleQueryPage.result[eleSummary].taxid}`,
          NumData: `path: ${singleQueryPage.result[eleSummary].path}`,
          VarientOne: `name: ${singleQueryPage.result[eleSummary].name}`,
          VarientSecond: `seqtype: ${singleQueryPage.result[eleSummary].sequencetype[0].seqtype}`,
        };

        summary.push(tempSummary);
      });
      // console.log(length);
      console.log(summary);
      break;

    case "books":
      singleQueryPage.result.uids.map((eleSummary) => {
        const tempSummary = {
          Title: `${singleQueryPage.result[eleSummary].organism}`,
          UniqeKey: `accession id:${singleQueryPage.result[eleSummary].accessionid}`,
          NumData: `id: ${singleQueryPage.result[eleSummary].id}`,
          VarientOne: `book accession id : ${singleQueryPage.result[eleSummary].bookaccessionid}`,
          VarientSecond: `chapter accession id : ${singleQueryPage.result[eleSummary].chapteraccessionid}`,
        };

        summary.push(tempSummary);
      });
      // console.log(length);
      console.log(summary);
      break;

    default:
      break;
  }

  return summary;
}
