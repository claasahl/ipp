# Notes

## RFC8010

### Change Request

https://tools.ietf.org/html/rfc8010#appendix-A.2

from:

```
    0x0004                                              value-length
    0x0003                           pending            value
    0x03                             end-of-attributes  end-of-
                                                        attributes-tag
```

to:

```
    0x0002                                              value-length
    0x0003                           pending            value
    0x03                             end-of-attributes  end-of-
                                                        attributes-tag
```

or

```
    0x0004                                              value-length
    0x00000003                       pending            value
    0x03                             end-of-attributes  end-of-
                                                        attributes-tag
```

### Change Request

https://tools.ietf.org/html/rfc8010#appendix-A.4

from:

```
   0x0004                                                 value-length
   0x0003                     pending                     value
   0x03                       end-of-attributes           end-of-
                                                          attributes-tag
```

to:

```
   0x0002                                                 value-length
   0x0003                     pending                     value
   0x03                       end-of-attributes           end-of-
                                                          attributes-tag
```

or

```
   0x0004                                                 value-length
   0x00000003                 pending                     value
   0x03                       end-of-attributes           end-of-
                                                          attributes-tag
```

### Remove?

https://tools.ietf.org/html/rfc8010#section-3.1.6
https://tools.ietf.org/html/rfc8010#section-3.1.7

"Collection Attribute" and "Member Attribute" are not reference anywhere in the ABNF grammar (https://tools.ietf.org/html/rfc8010#section-3.2). They don't appear to be required and could be removed.

Furthermore, the sample "Create-Job Request with Collection Attributes" (https://tools.ietf.org/html/rfc8010#appendix-A.7) does not map to these data structures (i.e. "Collection Attribute" and "Member Attribute"). However, it does fit into the "Attribute"-structure (https://tools.ietf.org/html/rfc8010#section-3.1.3)

The "Collection Attribute" ends with "end-value-tag", "end-name-length" and "end-value-length". Towards the end of aforementioned sample, there are two such endings. However, there is exactly one place where such an opinion is supposed to appear. What comes after "(<----- end of collection)" does not fit into "Collection Attribute" and "Member Attribute".

```
   Octets                         Symbolic Value       Protocol field

   0x0101                         1.1                  version-number
   0x0005                         Create-Job           operation-id
   0x00000001                     1                    request-id
   0x01                           start operation-     operation-
                                  attributes           attributes-tag
   0x47                           charset type         value-tag
   0x0012                                              name-length
   attributes-charset             attributes-charset   name
   0x0005                                              value-length
   utf-8                          UTF-8                value
   0x48                           natural-language     value-tag
                                  type
   0x001b                                              name-length
   attributes-natural-language    attributes-natural-  name
                                  language
   0x0005                                              value-length
   en-us                          en-US                value
   0x45                           uri type             value-tag
   0x000b                                              name-length
   printer-uri                    printer-uri          name
   0x002c                                              value-length
   ipp://printer.example.com/ipp/ printer pinetree     value
   print/pinetree
   0x34                           begCollection        value-tag
   0x0009                         9                    name-length
   media-col                      media-col            name
   0x0000                         0                    value-length
   0x4a                           memberAttrName       value-tag
   0x0000                         0                    name-length
   0x000a                         10                   value-length
   media-size                     media-size           value (member-
                                                       name)
   0x34                           begCollection        member-value-tag          (<----- beginning of collection)
   0x0000                         0                    name-length
   0x0000                         0                    member-value-
                                                       length
   0x4a                           memberAttrName       value-tag
   0x0000                         0                    name-length
   0x000b                         11                   value-length
   x-dimension                    x-dimension          value (member-
                                                       name)
   0x21                           integer              member-value-tag
   0x0000                         0                    name-length
   0x0004                         4                    member-value-
                                                       length
   0x00005208                     21000                member-value
   0x4a                           memberAttrName       value-tag
   0x0000                         0                    name-length
   0x000b                         11                   value-length
   y-dimension                    y-dimension          value (member-
                                                       name)
   0x21                           integer              member-value-tag
   0x0000                         0                    name-length
   0x0004                         4                    member-value-
                                                       length
   0x00007404                     29700                member-value
   0x37                           endCollection        end-value-tag             (<----- end of collection)
   0x0000                         0                    end-name-length
   0x0000                         0                    end-value-length
   0x4a                           memberAttrName       value-tag                 (<----- additional value)
   0x0000                         0                    name-length
   0x000a                         10                   value-length
   media-type                     media-type           value (member-
                                                       name)
   0x44                           keyword              member-value-tag          (<----- additional value)
   0x0000                         0                    name-length
   0x000a                         10                   member-value-
                                                       length
   stationery                     stationery           member-value
   0x37                           endCollection        end-value-tag             (<----- additional value)
   0x0000                         0                    end-name-length
   0x0000                         0                    end-value-length
   0x03                           end-of-attributes    end-of-
                                                       attributes-tag
```
