from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT

RED = colors.HexColor('#DC2626')
DARK = colors.HexColor('#0F172A')
GRAY = colors.HexColor('#64748B')
LIGHT = colors.HexColor('#F8FAFC')
BORDER = colors.HexColor('#E2E8F0')

OUTPUT = r'C:\Users\gonza\OneDrive\Documentos\openbankspv\public\documentacion-api-bank-spv.pdf'

doc = SimpleDocTemplate(OUTPUT, pagesize=A4,
    rightMargin=2*cm, leftMargin=2*cm, topMargin=2*cm, bottomMargin=2*cm)

story = []

def h1(text):
    return Paragraph(text, ParagraphStyle('h1', fontSize=22, textColor=DARK, spaceAfter=8, fontName='Helvetica-Bold'))

def h2(text):
    return Paragraph(text, ParagraphStyle('h2', fontSize=15, textColor=RED, spaceAfter=6, spaceBefore=16, fontName='Helvetica-Bold'))

def h3(text):
    return Paragraph(text, ParagraphStyle('h3', fontSize=12, textColor=DARK, spaceAfter=4, spaceBefore=10, fontName='Helvetica-Bold'))

def body(text):
    return Paragraph(text, ParagraphStyle('body', fontSize=9.5, textColor=DARK, spaceAfter=4, leading=14))

def small(text):
    return Paragraph(text, ParagraphStyle('small', fontSize=8.5, textColor=GRAY, spaceAfter=3, leading=13))

def code(text):
    return Paragraph(text.replace('\n', '<br/>').replace(' ', '&nbsp;'),
        ParagraphStyle('code', fontSize=8, fontName='Courier', textColor=colors.HexColor('#1E293B'),
            backColor=colors.HexColor('#F1F5F9'), spaceAfter=6, leading=13,
            leftIndent=8, rightIndent=8, spaceBefore=4))

def hr():
    return HRFlowable(width='100%', thickness=1, color=BORDER, spaceAfter=10, spaceBefore=6)

def endpoint_table(rows):
    data = [['Método', 'Endpoint', 'Descripción']]
    for r in rows:
        data.append(r)
    t = Table(data, colWidths=[2.2*cm, 8.5*cm, 6.3*cm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#F1F5F9')),
        ('TEXTCOLOR', (0,0), (-1,0), GRAY),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 8.5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F8FAFC')]),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('FONTNAME', (0,1), (0,-1), 'Courier-Bold'),
        ('TEXTCOLOR', (0,1), (0,-1), RED),
    ]))
    return t

LOREM = ('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt '
         'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco '
         'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in '
         'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat '
         'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')

# ── PORTADA ──────────────────────────────────────────────────────
story.append(Spacer(1, 2*cm))
story.append(Paragraph(
    '<font color="#DC2626"><b>API Bank</b></font> <font color="#94A3B8">by Supervielle</font>',
    ParagraphStyle('ch', fontSize=14, fontName='Helvetica')))
story.append(Spacer(1, 1.5*cm))
story.append(Paragraph('Integracion PSP',
    ParagraphStyle('ct', fontSize=11, textColor=GRAY, fontName='Helvetica')))
story.append(Spacer(1, 0.3*cm))
story.append(Paragraph('Documentacion Tecnica de la API',
    ParagraphStyle('ct2', fontSize=26, textColor=DARK, fontName='Helvetica-Bold', leading=32)))
story.append(Spacer(1, 0.5*cm))
story.append(Paragraph('Guia completa de integracion para Prestadores de Servicios de Pago (PSP)',
    ParagraphStyle('ct3', fontSize=12, textColor=GRAY, fontName='Helvetica', leading=18)))
story.append(Spacer(1, 1.5*cm))
story.append(HRFlowable(width='100%', thickness=3, color=RED, spaceAfter=16))

info = Table([
    ['Version', '1.0 - Ejemplo ilustrativo'],
    ['Fecha', 'Abril 2026'],
    ['Clasificacion', 'Demo - No representa documentacion oficial'],
    ['Contacto', 'apibank@supervielle.com.ar'],
], colWidths=[4*cm, 13*cm])
info.setStyle(TableStyle([
    ('FONTNAME', (0,0), (0,-1), 'Helvetica-Bold'),
    ('FONTSIZE', (0,0), (-1,-1), 9),
    ('TEXTCOLOR', (0,0), (0,-1), GRAY),
    ('TEXTCOLOR', (1,0), (1,-1), DARK),
    ('BOTTOMPADDING', (0,0), (-1,-1), 7),
    ('TOPPADDING', (0,0), (-1,-1), 7),
    ('LINEBELOW', (0,0), (-1,-2), 0.5, BORDER),
]))
story.append(info)
story.append(Spacer(1, 1.5*cm))

disc = Table([[Paragraph(
    'AVISO: Este documento es un ejemplo ilustrativo generado a modo de demostracion. '
    'Los endpoints, credenciales, datos y flujos descritos son ficticios. '
    'Para acceder a la documentacion oficial y al sandbox real, contactar al equipo de API Bank.',
    ParagraphStyle('disc', fontSize=8.5, textColor=colors.HexColor('#92400E'), leading=13)
)]], colWidths=[17*cm])
disc.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#FFFBEB')),
    ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#FDE68A')),
    ('LEFTPADDING', (0,0), (-1,-1), 12),
    ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ('TOPPADDING', (0,0), (-1,-1), 10),
    ('BOTTOMPADDING', (0,0), (-1,-1), 10),
]))
story.append(disc)
story.append(PageBreak())

# ── INDICE ────────────────────────────────────────────────────────
story.append(h1('Indice'))
story.append(hr())
toc = [
    ('1.', 'Objetivo y alcance', '3'),
    ('2.', 'Seguridad y autenticacion', '4'),
    ('3.', 'Gestion de Cuentas Virtuales (CVU)', '6'),
    ('4.', 'Gestion de Alias', '12'),
    ('5.', 'Gestion de Comercios y Actividades', '14'),
    ('6.', 'Operaciones Debin', '18'),
    ('7.', 'Pagos QR', '26'),
    ('8.', 'Transferencia Pull', '32'),
    ('9.', 'Conciliacion de Movimientos', '36'),
    ('10.', 'Anexo', '40'),
]
for num, title, page in toc:
    row = Table([[
        Paragraph(f'<b>{num}</b>', ParagraphStyle('tn', fontSize=9.5, textColor=RED, fontName='Helvetica-Bold')),
        Paragraph(title, ParagraphStyle('tt', fontSize=9.5, textColor=DARK)),
        Paragraph(page, ParagraphStyle('tp', fontSize=9.5, textColor=GRAY, alignment=TA_RIGHT)),
    ]], colWidths=[1*cm, 14*cm, 2*cm])
    row.setStyle(TableStyle([
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LINEBELOW', (0,0), (-1,-1), 0.5, BORDER),
    ]))
    story.append(row)
story.append(PageBreak())

# ── CAP 1 ─────────────────────────────────────────────────────────
story.append(h2('1. Objetivo y alcance'))
story.append(body(LOREM))
story.append(body(LOREM))
story.append(h3('1.1 Modulos cubiertos'))
mods = Table([
    ['Modulo', 'Descripcion'],
    ['CVU', 'Alta, baja y modificacion de Cuentas Virtuales'],
    ['Alias', 'Gestion de alias asociados a CVUs'],
    ['Comercios', 'Alta y administracion de comercios y actividades'],
    ['Debin', 'Debito Inmediato spot, recurrente y contracargos'],
    ['QR', 'Generacion y procesamiento de pagos QR'],
    ['Pull', 'Transferencias pull para ingreso de fondos'],
    ['Movimientos', 'Consulta y conciliacion de operaciones'],
], colWidths=[4*cm, 13*cm])
mods.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#F1F5F9')),
    ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
    ('FONTSIZE', (0,0), (-1,-1), 9),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F8FAFC')]),
    ('GRID', (0,0), (-1,-1), 0.5, BORDER),
    ('LEFTPADDING', (0,0), (-1,-1), 8),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
]))
story.append(mods)
story.append(PageBreak())

# ── CAP 2 ─────────────────────────────────────────────────────────
story.append(h2('2. Seguridad y autenticacion'))
story.append(body(LOREM))
story.append(h3('2.1 Obtencion del token'))
story.append(body('El access token se obtiene mediante el endpoint de autenticacion:'))
story.append(code('POST https://sandbox.api.supervielle.com.ar/auth/token\nAuthorization: Basic {base64(client_id:client_secret)}\n\ngrant_type=client_credentials'))
story.append(body('Response exitoso:'))
story.append(code('{\n  "access_token": "eyJhbGciOiJSUzI1NiJ9...",\n  "token_type": "Bearer",\n  "expires_in": 3600\n}'))
story.append(h3('2.2 Uso del token'))
story.append(code('Authorization: Bearer {access_token}'))
story.append(body(LOREM))
story.append(PageBreak())

# ── CAP 3 ─────────────────────────────────────────────────────────
story.append(h2('3. Gestion de Cuentas Virtuales (CVU)'))
story.append(body(LOREM))
story.append(h3('Endpoints disponibles'))
story.append(endpoint_table([
    ['POST', '/apiCVU/CVU/AltaCVU', 'Crear nueva CVU'],
    ['GET', '/apiCVU/CVU/ConsultaCVU/{cvu}', 'Consultar datos de CVU'],
    ['DELETE', '/apiCVU/CVU/BajaCVU/{cvu}/{cuit}', 'Baja logica de CVU'],
    ['PUT', '/apiCVU/CVU/ModificacionCVU/{cvu}', 'Modificar datos de CVU'],
]))
story.append(h3('3.1 Alta de CVU'))
story.append(body(LOREM))
story.append(body('Request Body:'))
story.append(code('{\n  "cvu": {\n    "psp_id": 4,\n    "cuit": "20333048494",\n    "titular": "Juan Perez",\n    "moneda": "032",\n    "persona_tipo": "F"\n  }\n}'))
story.append(body('Response (200 OK):'))
story.append(code('{\n  "alias": { "valor": "PERRO.CASA.LUNA" },\n  "respuesta": { "codigo": "3200", "descripcion": "CVU ACTIVO" }\n}'))

codes_table = Table([
    ['Codigo', 'Descripcion'],
    ['3200', 'CVU ACTIVO'],
    ['3210', 'PSP INEXISTENTE O TIENE ESTADO INCORRECTO'],
    ['3212', 'CVU MAL FORMULADO'],
    ['3213', 'CUIT MAL FORMULADO'],
    ['3219', 'ERROR CVU EXISTENTE'],
    ['3299', 'ERROR GENERAL'],
], colWidths=[3*cm, 14*cm])
codes_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#F1F5F9')),
    ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
    ('FONTSIZE', (0,0), (-1,-1), 8.5),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F8FAFC')]),
    ('GRID', (0,0), (-1,-1), 0.5, BORDER),
    ('LEFTPADDING', (0,0), (-1,-1), 8),
    ('TOPPADDING', (0,0), (-1,-1), 4),
    ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ('FONTNAME', (0,1), (0,-1), 'Courier'),
    ('TEXTCOLOR', (0,1), (0,-1), RED),
]))
story.append(codes_table)
story.append(PageBreak())

# ── CAPS 4-9 ──────────────────────────────────────────────────────
chapters = [
    ('4. Gestion de Alias', [
        ['POST', '/apiCVU/Alias/ModificarAlias', 'Modificar alias'],
        ['POST', '/apiCVU/Alias/ConsultaAlias', 'Consultar alias'],
    ]),
    ('5. Gestion de Comercios y Actividades', [
        ['POST', '/apiComercio/Actividad/AltaActividad', 'Alta de actividad'],
        ['POST', '/apiComercio/Comercio/AltaComercio', 'Alta de comercio'],
        ['GET', '/apiComercio/Comercio/ConsultaComercio/{id}', 'Consultar comercio'],
        ['DELETE', '/apiComercio/Comercio/BajaComercio/{id}', 'Baja de comercio'],
    ]),
    ('6. Operaciones Debin', [
        ['GET', '/apiDebin/Debin/ConsultaDebin/{id}', 'Consultar Debin'],
        ['POST', '/apiDebin/Debin/ConfirmaDebitoCVU', 'Confirmar debito'],
        ['POST', '/apiDebin/Debin/AdhesionRecurrencia', 'Adhesion recurrente'],
        ['POST', '/apiDebin/Debin/SolicitudContracargo', 'Solicitar contracargo'],
    ]),
    ('7. Pagos QR', [
        ['POST', '/apiQR/QR/GenerarDebinQR', 'Generar QR de cobro'],
        ['GET', '/apiQR/QR/ConsultaDebinQR/{id}', 'Consultar QR'],
        ['POST', '/apiQR/QR/CashoutQR', 'Cashout QR desde CVU'],
        ['POST', '/apiQR/QR/ContrarcargoDebinQR', 'Contracargo QR'],
    ]),
    ('8. Transferencia Pull', [
        ['POST', '/apiTransferencia/Pull/IngresoDinero', 'Iniciar pull de fondos'],
        ['POST', '/apiTransferencia/Pull/Contracargo', 'Contracargo pull'],
    ]),
    ('9. Conciliacion de Movimientos', [
        ['GET', '/apiMovimientos/Movimientos/ConsultaMovimientos', 'Consultar movimientos'],
        ['GET', '/apiMovimientos/Movimientos/ConsultaSaldo/{cvu}', 'Consultar saldo CVU'],
    ]),
]

for chap_title, ep_rows in chapters:
    story.append(h2(chap_title))
    story.append(body(LOREM))
    story.append(h3('Endpoints disponibles'))
    story.append(endpoint_table(ep_rows))
    story.append(Spacer(1, 0.3*cm))
    story.append(body(LOREM))
    story.append(body(LOREM))
    story.append(PageBreak())

# ── CAP 10: ANEXO ─────────────────────────────────────────────────
story.append(h2('10. Anexo'))
story.append(body(LOREM))
story.append(h3('Estados del Debin'))
estados = Table([
    ['Estado', 'Codigo', 'Descripcion'],
    ['PENDIENTE', '01', 'Debin generado, esperando confirmacion del comprador'],
    ['ACEPTADO', '02', 'Comprador confirmo el debito'],
    ['RECHAZADO', '03', 'Comprador rechazo el debito'],
    ['ACREDITADO', '04', 'Fondos acreditados en la CVU del vendedor'],
    ['VENCIDO', '05', 'El Debin expiro sin respuesta'],
    ['CONTRACARGO', '06', 'Se inicio proceso de contracargo'],
], colWidths=[4*cm, 2.5*cm, 10.5*cm])
estados.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#F1F5F9')),
    ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
    ('FONTSIZE', (0,0), (-1,-1), 9),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F8FAFC')]),
    ('GRID', (0,0), (-1,-1), 0.5, BORDER),
    ('LEFTPADDING', (0,0), (-1,-1), 8),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('FONTNAME', (0,1), (0,-1), 'Courier-Bold'),
    ('TEXTCOLOR', (0,1), (0,-1), RED),
]))
story.append(estados)
story.append(Spacer(1, 1*cm))
story.append(body(LOREM))
story.append(Spacer(1, 2*cm))
story.append(HRFlowable(width='100%', thickness=1, color=BORDER))
story.append(Spacer(1, 0.3*cm))
story.append(Paragraph('API Bank SPV  |  Ejemplo ilustrativo  |  No representa documentacion oficial',
    ParagraphStyle('footer', fontSize=8, textColor=GRAY, alignment=TA_CENTER)))

doc.build(story)
print('PDF generado OK')
