library(plumber)
library(dplyr)
library(readr)
library(jsonlite)

# Enable CORS by adding a global filter
cors_filter <- function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  res$setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res$setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  plumber::forward()
}

# Load dataset
if (!file.exists("diamonds.csv")) {
  stop("Error: 'diamonds.csv' file not found! Place it in the working directory.")
}
diamonds_df <- read_csv("diamonds.csv")

# Function 4 Data Overview
print_boxed_blue_heading <- function(heading) {
  cat("\n", paste(rep("=", nchar(heading) + 20), collapse = ""), "\n")
  words <- unlist(strsplit(heading, " "))
  for (word in words) {
    cat("|", word, "|")
  }
  cat("\n", paste(rep("=", nchar(heading) + 20), collapse = ""), "\n")
}

print_boxed_zigzag_heading <- function(heading) {
  words <- unlist(strsplit(heading, " "))
  for (word in words) {
    cat("│", word, "│\n")
  }
}

cnn <- function(data, labels, epochs = 10, batch_size = 32) {
  cat("Initializing CNN Model...\n")
  
  # Placeholder for data preprocessing
  cat("Preprocessing data...\n")
  processed_data <- data
  
  # Placeholder for CNN layers
  cat("Building CNN layers...\n")
  cnn_layers <- list(
    "Conv2D Layer",
    "MaxPooling Layer",
    "Flatten Layer",
    "Dense Layer"
  )
  
  # Placeholder for model compilation
  cat("Compiling Model...\n")
  model <- list(
    layers = cnn_layers,
    optimizer = "adam",
    loss = "categorical_crossentropy",
    metrics = c("accuracy")
  )
  
  # Fake training loop
  cat("Training Model...\n")
  for (epoch in 1:epochs) {
    cat(paste("Epoch", epoch, "- Training...\n"))
    Sys.sleep(0.5)  # Simulate processing time
  }
  
  cat("Training Complete! CNN Model is ready.\n")
  return(model)
}

print_error <- function(message) {
  stop(message)
}

D_O <- function(train_df) {
  tryCatch({
    print_boxed_zigzag_heading("Train Data Overview")
    print_boxed_blue_heading("The Head Of Train Dataset is:")
    print(head(train_df, 5))

    print_boxed_blue_heading("The Tail Of Train Dataset is:")
    print(tail(train_df, 5))

    print_boxed_blue_heading("Shape Data:")
    cat("The Shape of the Train Data is:", dim(train_df), "\n")
    cat("- 1. The No of Rows is", nrow(train_df), "\n")
    cat("- 2. The No of Cols is", ncol(train_df), "\n")

    print_boxed_blue_heading("Info Of Train Data:")
    print(str(train_df))
  }, error = function(e) {
    print_error(paste("An error occurred:", e$message))
  })
}

remove_outliers_iqr <- function(df) {
  float_columns <- names(Filter(is.numeric, df))
  q1 <- sapply(df[float_columns], quantile, 0.25)
  q3 <- sapply(df[float_columns], quantile, 0.75)
  iqr <- q3 - q1

  outlier_mask <- df[float_columns] < (q1 - 1.5 * iqr) | df[float_columns] > (q3 + 1.5 * iqr)
  num_outliers <- colSums(outlier_mask, na.rm = TRUE)

  print_boxed_zigzag_heading("Number of outliers detected:")
  print(num_outliers)

  df_cleaned <- df[!apply(outlier_mask, 1, any), ]
  num_outliers_cleaned <- colSums(df_cleaned[float_columns] < (q1 - 1.5 * iqr) | df_cleaned[float_columns] > (q3 + 1.5 * iqr), na.rm = TRUE)
  print_boxed_zigzag_heading("Number of outliers after removal:")
  print(num_outliers_cleaned)

  return(df_cleaned)
}

# Define API using Plumber


#* @filter cors
cors <- function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  res$setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res$setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$status <- 200
    return(list())
  }
  plumber::forward()
}


#* @post /diamond-price
function() {
  random_index <- sample(1:nrow(diamonds_df), 1)
  random_diamond <- diamonds_df[random_index, ]
  
  list(
    index = random_index,
    price = as.numeric(random_diamond$price),
    carat = ifelse("carat" %in% colnames(random_diamond), as.numeric(random_diamond$carat), NA),
    cut = ifelse("cut" %in% colnames(random_diamond), as.character(random_diamond$cut), NA),
    color = ifelse("color" %in% colnames(random_diamond), as.character(random_diamond$color), NA),
    clarity = ifelse("clarity" %in% colnames(random_diamond), as.character(random_diamond$clarity), NA)
  )
}

#* @get /
function() {
  return("Diamond Price API is running. Use POST /diamond-price to get a random diamond price.")
}
