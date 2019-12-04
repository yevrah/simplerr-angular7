from simplerr import web

@web('/dashboard/detail/api')
def api(request):
    return {'message': 'hello world'}
