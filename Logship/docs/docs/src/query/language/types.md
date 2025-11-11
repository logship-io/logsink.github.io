# types

Summary of the types supported by Logship's kusto query langague.

## String
A string.

### Literals
```
"Whatever string you'd like"
'Another string'
```

## Int64
A signed 64 bit integer.

### Literals
```
1
-2

// Binary Literal
0b0011001100

// Hex literal
0xffffff
```

## UInt64
An unsigned 64 bit integer.

## Float64
A signed 64 bit floating point number. (Double in many languages.)

### Literals
```
0.5
-0.5
```

## DateTime
A timestamp, with the maximum resolution of one ten-millionth of a second (100ns).

### Properties
* Min - 00:00:00 (midnight), January 1, 0001 Anno Domini (Common Era)
* Max - 11:59:59 P.M., December 31, 9999 A.D. (C.E.)

### Literals
```
datetime(yyyy-MM-ddThh:mm:ss.ffffffz)
```

## Timespan
A time interval, with the maximum resolution of one-tenmillionth of a second (100ns). 
* Maximum TimeSpan       10675199.02:48:05.4775807
* Minimum TimeSpan      -10675199.02:48:05.4775808

### Literals
```
time(dd:hh:mm.fffff)

// Years
1y
2year
3years

// Month (30 days)
1M
2Month
3Months
4month
5months

// Days
1d
2day
3days

// Hours
1h
2hour
3hours

// Minutes
1m
2minute
3minutes

// Seconds
1s
2second
3seconds

// Milliseconds
1ms
2millisecond
3milliseconds

// Microseconds
1us
2μs
3microsecond
4microseconds

// Ticks (100ns)
1tick
2ticks
```

## Boolean
A boolean value

### Literals
```
true
false
```

## Int128
A 128 bit integer. (A UUID / GUID)
