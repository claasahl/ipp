//     Octets ;Symbolic Value ;Protocol field
//     0x0101 ;1.1;version-number
//     0x0000 ;successful-ok ;status-code
//     0x00000001 ;1;request-id
//     0x01 ;start operation-attributes ;operation-attributes-tag
//     0x47 ;charset type ;value-tag
//     0x0012 ; ;name-length
//     attributes-charset ;attributes-charset ;name
//     0x0005 ; ;value-length
//     utf-8 ;UTF-8 ;value
//     0x48 ;natural-language type ;value-tag
//     0x001b ; ;name-length
//     attributes-natural-language ;attributes-natural-language ;name
//     0x0005 ; ;value-length
//     en-us ;en-US ;value
//     0x41 ;textWithoutLanguae typeg ;value-tag
//     0x000e ; ;name-length
//     status-message ;status-message ;name
//     0x000d ; ;value-length
//     successful-ok ;successful-ok ;value
//     0x02 ;start job-attributes ;job-attributes-tag
//     0x21 ;integer ;value-tag
//     0x0006 ; ;name-length
//     job-id ;job-id ;name
//     0x0004 ; ;value-length
//     147;147;value
//     0x45 ;uri type ;value-tag
//     0x0007 ; ;name-length
//     job-uri ;job-uri ;name
//     0x0030 ; ;value-length
//     ipp://printer.example.com/ipp/print/pinetree/147 ;job 147 on pinetree ;value
//     0x23 ;enum type ;value-tag
//     0x0009 ; ;name-length
//     job-state ;job-state ;name
//     0x0004 ; ;value-length
//     0x0003 ;pending ;value
//     0x03 ;end-of-attributes ;end-of-attributes-tag
