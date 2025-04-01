# Diamond Price API (R + Plumber)

This is a simple API built using **R** and **Plumber** that provides random diamond price data. The API reads from a `diamonds.csv` dataset and serves endpoints to fetch random diamond prices.

## **Prerequisites**

Before running this API, ensure you have:
- **R Installed** ([Download R](https://cran.r-project.org/))
- **R GUI Installed** (Comes with R by default)
- Required R packages installed (see below)

## **1. Clone the Repository**

Open **Command Prompt** and navigate to the desired directory where you want to clone the repository and then clone it.

## **2. Install Required Packages**

Open **R GUI** and run the following command to install the necessary packages:

```r
install.packages(c("plumber", "dplyr", "readr", "jsonlite"), repos='http://cran.rstudio.com/')
```

## **3. Set Up the Working Directory**

In **R GUI**, set the working directory to the backend folder:

```r
setwd("D:/Github/R_diamond_predictor/backend")  # Adjust the path as needed
```

Then, verify that `diamonds.csv` is present:

```r
file.exists("diamonds.csv")
```
If it returns `FALSE`, create the dataset using:

```r
write.csv(ggplot2::diamonds, "diamonds.csv", row.names = FALSE)
```

## **4. Run the API in R GUI**

Now, start the API by running the following commands in **R GUI**:

```r
library(plumber)
r <- plumb("diamond_api.R")
r$run(port=8000)
```

## **5. Test the API**

### **Using Web Browser**
- Open: `http://127.0.0.1:8000/`

### **Using cURL in Command Prompt**
Run this in Windows Command Prompt:

```sh
curl -X POST http://127.0.0.1:8000/diamond-price
```

### **Using JavaScript Fetch API**
```js
fetch("http://127.0.0.1:8000/diamond-price", {
    method: "POST"
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
```

## **6. Run API in Background (Optional)**
If you want to keep the API running after closing **R GUI**, use:

```sh
start /B R -e "library(plumber); r <- plumb('diamond_api.R'); r$run(port=8000)"
```

---
### ✅ **Now your R-based API is fully functional!** 🚀