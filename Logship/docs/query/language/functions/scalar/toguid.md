# toguid

The toguid function converts its argument to a GUID (Globally Unique Identifier) value.

## Spec

```
toguid(arg0)
```

### Parameters

```
arg0 - The value to convert to GUID. Typically a string in GUID format.
```

### Return Value

```
A GUID value.
```

## Example

Convert string to GUID:

```kusto
datatable(s:string)["b2e1975b-677c-4ac6-a0ed-e63acb67ff09"]
| extend guid_val = toguid(s)
```

| s                                    | guid_val                             |
| ------------------------------------ | ------------------------------------ |
| b2e1975b-677c-4ac6-a0ed-e63acb67ff09 | b2e1975b-677c-4ac6-a0ed-e63acb67ff09 |
