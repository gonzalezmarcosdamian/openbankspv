"""
Test de integracion pre-deploy para API Bank SPV.
Verifica el output estatico en /out antes de pushear a GitHub Pages.
Uso: py scripts/test_build.py
"""
import os, sys, re

OUT = r'C:\Users\gonza\OneDrive\Documentos\openbankspv\out'
PUBLIC = r'C:\Users\gonza\OneDrive\Documentos\openbankspv\public'
BASE = '/openbankspv'

PASS = '\033[92m[OK]\033[0m'
FAIL = '\033[91m[FAIL]\033[0m'
WARN = '\033[93m[WARN]\033[0m'

errors = []
warnings = []

def check(condition, label, fatal=True):
    if condition:
        print(f'  {PASS} {label}')
    else:
        print(f'  {FAIL} {label}')
        if fatal:
            errors.append(label)
        else:
            warnings.append(label)

def read(path):
    try:
        with open(path, encoding='utf-8', errors='replace') as f:
            return f.read()
    except:
        return ''

print('\n=== TEST DE INTEGRACION PRE-DEPLOY ===\n')

# 1. Archivos criticos en /out
print('[ 1 ] Archivos criticos generados:')
check(os.path.isfile(f'{OUT}/index.html'),               'out/index.html existe')
check(os.path.isfile(f'{OUT}/docs/index.html'),          'out/docs/index.html existe')
check(os.path.isfile(f'{OUT}/swagger.html'),             'out/swagger.html existe')
check(os.path.isfile(f'{OUT}/openapi/v1.yaml'),          'out/openapi/v1.yaml existe')
check(os.path.isfile(f'{OUT}/documentacion-api-bank-spv.pdf'), 'out/PDF descargable existe')
check(os.path.isfile(f'{OUT}/llms.txt'),                 'out/llms.txt existe')
check(os.path.isfile(f'{OUT}/AGENTS.md'),                'out/AGENTS.md existe')

# 2. Links internos en index.html usan basePath correcto
print('\n[ 2 ] Links en index.html usan basePath /openbankspv:')
index_html = read(f'{OUT}/index.html')
check('/openbankspv/docs' in index_html,                 'Link a /docs con basePath')
check('/openbankspv/documentacion-api-bank-spv.pdf' in index_html, 'Link a PDF con basePath')
check('/openbankspv/llms.txt' in index_html,             'Link a llms.txt con basePath', fatal=False)
check('/openbankspv/AGENTS.md' in index_html,            'Link a AGENTS.md con basePath', fatal=False)

# 3. Links en docs/index.html
print('\n[ 3 ] Links en docs/index.html:')
docs_html = read(f'{OUT}/docs/index.html')
check('/openbankspv/swagger.html' in docs_html,          'iframe apunta a /openbankspv/swagger.html')
check('/openbankspv/openapi/v1.yaml' in docs_html,       'Link al spec YAML con basePath')
check('/openbankspv/documentacion-api-bank-spv.pdf' in docs_html, 'Link a PDF en docs con basePath')

# 4. Swagger HTML carga desde CDN correcto
print('\n[ 4 ] swagger.html:')
swagger_html = read(f'{OUT}/swagger.html')
check('unpkg.com/swagger-ui-dist' in swagger_html,       'Carga Swagger UI desde CDN')
check('openapi/v1.yaml' in swagger_html,                 'Apunta al spec v1.yaml')
check('tryItOutEnabled: false' in swagger_html,          'tryItOutEnabled deshabilitado (no sandbox)')

# 5. OpenAPI spec valido
print('\n[ 5 ] OpenAPI spec:')
yaml_content = read(f'{OUT}/openapi/v1.yaml')
check('openapi: 3.0.3' in yaml_content,                  'Version OpenAPI 3.0.3')
check('/apiCVU/CVU/AltaCVU' in yaml_content,             'Endpoint CVU presente')
check('/apiDebin/Debin/ConsultaDebin' in yaml_content,   'Endpoint Debin presente')
check('/apiQR/QR/GenerarDebinQR' in yaml_content,        'Endpoint QR presente')
check('/apiMovimientos/' in yaml_content,                 'Endpoint Movimientos presente')
check('bearerAuth' in yaml_content,                      'Auth Bearer definido')

# 6. PDF existe y tiene tamano razonable
print('\n[ 6 ] PDF:')
pdf_path = f'{OUT}/documentacion-api-bank-spv.pdf'
if os.path.isfile(pdf_path):
    size_kb = os.path.getsize(pdf_path) / 1024
    check(size_kb > 10,  f'PDF tiene tamano razonable ({size_kb:.0f} KB)')
    check(size_kb < 5000, 'PDF no es demasiado grande')
else:
    check(False, 'PDF existe')

# 7. Disclaimer visible
print('\n[ 7 ] Disclaimer:')
check('aprendizaje' in index_html.lower() or 'ilustrativo' in index_html.lower(),
      'Disclaimer visible en index.html')
check('ilustrativa' in docs_html.lower() or 'ficticios' in docs_html.lower(),
      'Disclaimer visible en docs')

# 8. No hay links rotos apuntando a / sin basePath
print('\n[ 8 ] No hay links sin basePath (regresion):')
broken_docs = re.findall(r'href="(/docs)"', index_html)
check(len(broken_docs) == 0, f'No hay href="/docs" sin basePath (encontrados: {len(broken_docs)})')
broken_pdf = re.findall(r'href="(/documentacion[^"]*\.pdf)"', index_html)
check(len(broken_pdf) == 0, f'No hay href al PDF sin basePath (encontrados: {len(broken_pdf)})')

# ── RESULTADO ─────────────────────────────────────────────────────
print('\n' + '='*40)
if errors:
    print(f'\n{FAIL} DEPLOY BLOQUEADO — {len(errors)} error(es):\n')
    for e in errors:
        print(f'  - {e}')
    sys.exit(1)
elif warnings:
    print(f'\n{WARN} OK con {len(warnings)} advertencia(s) — deploy permitido')
    for w in warnings:
        print(f'  - {w}')
    sys.exit(0)
else:
    print(f'\n{PASS} TODOS LOS CHECKS PASARON — listo para deploy')
    sys.exit(0)
