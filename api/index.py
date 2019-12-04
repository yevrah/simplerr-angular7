from simplerr import web

@web('/api/dashboard/detail')
def api(request):
    return {'message': 'hello world'}
