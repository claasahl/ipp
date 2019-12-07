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
