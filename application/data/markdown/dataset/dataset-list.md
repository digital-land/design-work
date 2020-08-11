This page is for consumers of our data.

Requirements/needs

* what we’ve collected
* what data we are working on - work in progress. Is this the same as above? Are there indicators? (Size of sample, number of schemas covered)
* what we plan/propose to work on - future datasets

Need to scope what “datasets” we list of this page

* All datasets we collect?
* Do we also link to "data" such as contribution purposes?

We collect and compile an organisation dataset but it isn’t shown on here, is that on purpose or by accident?

How many datasets do we have at the moment? 

* Brownfield land
* Local plans
* Organisations?
* AddressBase?
* Boundaries?

**Recommendation:** Set the context of the page
**Recommendation:** One-liner for what user will see when clicking on the datasets in the list

Investigate: navigating through the branches that each concept (brownfield or local plans) has:
<https://design-system.service.gov.uk/patterns/step-by-step-navigation/>

Do we need the download section on this page?  
If we do, what would the user download? Everything? How would that work when all our data is on github, split by dataset.

### Build

Pages rendered by [dataset repo](https://github.com/digital-land/dataset).  
List populated by [dataset.csv](https://raw.githubusercontent.com/digital-land/dataset-collection/master/dataset/dataset.csv).  
**Issue**: Rows in dataset.csv point to a single data file. E.g. local plans points to [development-plans.csv](https://raw.githubusercontent.com/digital-land/alpha-data/master/local-plans/development-plan.csv) but how does it know about the full data package?