# newid

The newid function generates a new globally unique identifier (GUID).

## Spec

```
newid()
```

### Parameters

```
None.
```

### Return Value

```
A new GUID value.
```

## Example

Generate a new GUID for each row:

```kusto
range x from 1 to 3 step 1
| extend guid = newid()
```

| x   | guid                                 |
| --- | ------------------------------------ |
| 1   | 7e06a7c3-d7b0-4e1c-b8da-c51c8cb326fa |
| 2   | 8c230872-f550-4226-8ee7-ca9bf309f7b8 |
| 3   | b2e1975b-677c-4ac6-a0ed-e63acb67ff09 |

(Actual GUID values will be different each run.)
