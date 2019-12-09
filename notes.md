# Notes

## Keep in Mind

### Missing Attributes

https://tools.ietf.org/html/rfc8010#section-3.3

```
   A receiver of a request MUST be able to process the following as
   equivalent empty attribute groups:

   a.  A "begin-attribute-group-tag" field with zero following
       "attribute" fields.

   b.  A missing, but expected, "begin-attribute-group-tag" field.
```

### HTTP Status Code (200)

https://tools.ietf.org/html/rfc8010#section-3.4.3

```
   If an IPP status-code is returned, then the HTTP status-code MUST be
   200 (OK).  With any other HTTP status-code value, the HTTP response
   MUST NOT contain an IPP message body, and thus no IPP status-code is
   returned.
```

### Order Matters

https://tools.ietf.org/html/rfc8010#section-3.5.1

```
   The order and presence of "attribute-group" fields (whose beginning
   is marked by the "begin-attribute-group-tag" subfield) for each
   operation request and each operation response MUST be that defined in
   the Model.
```

### Port 631

https://tools.ietf.org/html/rfc8010#section-4

```
   Printer implementations MUST support HTTP over the IANA-assigned
   well-known port 631 (the IPP default port), although a Printer
   implementation can support HTTP over some other port as well.
```

### Content-Type: application/ipp

https://tools.ietf.org/html/rfc8010#section-4

```
   Each HTTP operation MUST use the POST method where the request-target
   is the object target of the operation and where the "Content-Type" of
   the message body in each request and response MUST be "application/
   ipp".  The message body MUST contain the operation layer and MUST
```

### Same Port for IPP and IPPS

https://tools.ietf.org/html/rfc8010#section-5

```
   1.  change the 'ipp' scheme to 'http' or 'ipps' scheme to 'https';
       and

   2.  add an explicit port 631 if the ipp-URL or ipps-URL does not
       contain an explicit port.  Note that port 631 is the IANA-
       assigned well-known port for the 'ipp' and 'ipps' schemes.
```

### Gotta Use ipp:// or ipps://

https://tools.ietf.org/html/rfc8010#section-5

```
   The Client MUST use the target http-URL or https-URL in both the HTTP
   request-line and HTTP headers, as specified by HTTP [RFC7230].
   However, the Client MUST use the target ipp-URI or ipps-URI for the
   value of the "printer-uri" or "job-uri" operation attribute within
   the application/ipp body of the request.  The server MUST use the
   ipp-URI or ipps-URI for the value of the "printer-uri", "job-uri", or
   "printer-uri-supported" attributes within the application/ipp body of
   the response.
```

### Digest Authentication

https://tools.ietf.org/html/rfc8010#section-8.1.1

```
   Note: Previous versions of this specification required support for
   the MD5 algorithms; however, [RFC7616] makes SHA2-256 mandatory to
   implement and deprecates MD5, only allowing its use for backwards
   compatibility reasons.  IPP implementations that support Digest
   Authentication MUST support SHA2-256 and SHOULD support MD5 for
   backwards compatibility.
```

### Trust on First Use

https://tools.ietf.org/html/rfc8010#section-8.1.2

```
   Note: Because IPP Printers typically use self-signed X.509
   certificates, IPP Clients SHOULD support Trust On First Use (defined
   in [RFC7435]) in addition to traditional X.509 certificate
   validation.
```

### Version-Number

https://tools.ietf.org/html/rfc8010#section-9

```
   o  respond appropriately with a response containing the same
      "version-number" parameter value used by the Client in the request
      (if the Client-supplied "version-number" is supported) or the
      highest "version-number" supported by the Printer (if the Client-
      supplied "version-number" is not supported).
```

### 'server-error-version-not-supported'

https://tools.ietf.org/html/rfc8010#section-9.1

```
   3.  IPP objects SHOULD either accept requests whose major version is
       greater than 0 or reject such requests with the 'server-error-
       version-not-supported' status-code.  See Section 4.1.8 of
       [RFC8011].
```

### Security MUST NOT be Compromised

https://tools.ietf.org/html/rfc8010#section-9.1

```
   4.  In any case, security MUST NOT be compromised when a Client
       supplies a lower "version-number" parameter in a request.  For
       example, if an IPP/2.0 conforming Printer accepts version '1.1'
       requests and is configured to enforce Digest Authentication, it
       MUST do the same for a version '1.1' request.
```

### Conformance

https://tools.ietf.org/html/rfc8011#section-6.1

```
   A conforming Client supports all REQUIRED operations as defined in
   this document.  For each attribute included in an operation request,
   a conforming Client MUST supply a value whose type and value syntax
   conforms to the requirements specified in Sections 4 and 5 of this
   document.  A conforming Client MAY supply any Standards Track
   extensions and/or vendor extensions in an operation request, as long
   as the extensions meet the requirements in Section 7.
```

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
